import type { IRootState } from '@/store'
import { ILyric, parseLyric } from '@/utils/parse-lyric'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSongDetail, getSongLyric } from '../service/player'

interface IThunkState {
  state: IRootState
}
export const fetchCurrentSongAction = createAsyncThunk<
  void,
  number,
  IThunkState
>('player/currentSong', (id: number, { dispatch, getState }) => {
  // 准备播放某一首歌曲时, 分成两种情况
  // 从列表尝试是否可以获取到这首歌
  const playSongList = getState().player.playSongList
  const findIndex = playSongList.findIndex((item) => item.id === id)
  if (findIndex === -1) {
    // 没有找到相同的
    // 获取歌曲信息
    getSongDetail(id).then((res) => {
      // 获取song
      if (!res.songs.length) return
      const song = res.songs[0]

      // 将song放到currentSong中
      const newPlaySongList = [...playSongList]
      newPlaySongList.push(song)
      dispatch(changeCurrentSongAction(song))
      dispatch(changePlaySongListAction(newPlaySongList))
      dispatch(changePlaySongIndexAction(newPlaySongList.length - 1))
    })
  } else {
    // 找到了相同的item
    const song = playSongList[findIndex]
    dispatch(changeCurrentSongAction(song))
    dispatch(changePlaySongIndexAction(findIndex))
  }

  // 获取歌词数据
  getSongLyric(id).then((res) => {
    // 获取歌词的字符串
    const lyricString = res.lrc.lyric
    // 对歌词进行解析(一个个对象)
    const lyrics = parseLyric(lyricString)
    // 将歌词放到state中
    dispatch(changeLyricsAction(lyrics))
  })
})

export const changeMusicAction = createAsyncThunk<void, boolean, IThunkState>(
  'player/changeMuisc',
  (isNext, { dispatch, getState }) => {
    // 获取state中的数据
    const player = getState().player
    const playMode = player.playMode
    const songIndex = player.playSongIndex
    const songList = player.playSongList

    // 根据不同的模式计算不同的下一首歌曲的索引
    let newIndex = songIndex
    if (playMode === 1) {
      // 随机播放
      newIndex = Math.floor(Math.random() * songList.length)
    } else {
      // 单曲顺序和顺序播放
      newIndex = isNext ? songIndex + 1 : songIndex - 1
      if (newIndex > songList.length - 1) newIndex = 0
      if (newIndex < 0) newIndex = songList.length - 1
    }

    // 获取当前的歌曲
    const song = songList[newIndex]
    dispatch(changeCurrentSongAction(song))
    dispatch(changePlaySongIndexAction(newIndex))

    // 请求新的歌词
    getSongLyric(song.id).then((res) => {
      // 获取歌词的字符串
      const lyricString = res.lrc.lyric
      // 对歌词进行解析(一个个对象)
      const lyrics = parseLyric(lyricString)
      // 将歌词放到state中
      dispatch(changeLyricsAction(lyrics))
    })
  }
)

interface IPlayerState {
  currentSong: any
  lyrics: ILyric[]
  lyricIndex: number
  playSongList: any[]
  playSongIndex: number
  playMode: number
}
const initialState: IPlayerState = {
  currentSong: {},
  lyrics: [],
  lyricIndex: -1,
  playSongList: [],
  playSongIndex: -1,

  playMode: 0 // 0:顺序播放 1:随机播放 2:单曲循环
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSongAction(state, { payload }) {
      state.currentSong = payload
    },
    changeLyricsAction(state, { payload }) {
      state.lyrics = payload
    },
    changeLyricIndexAction(state, { payload }) {
      state.lyricIndex = payload
    },
    changePlaySongIndexAction(state, { payload }) {
      state.playSongIndex = payload
    },
    changePlaySongListAction(state, { payload }) {
      state.playSongList = payload
    },
    changePlayModeAction(state, { payload }) {
      state.playMode = payload
    }
  }
})

export const {
  changeCurrentSongAction,
  changeLyricsAction,
  changeLyricIndexAction,
  changePlaySongIndexAction,
  changePlaySongListAction,
  changePlayModeAction
} = playerSlice.actions
export default playerSlice.reducer
