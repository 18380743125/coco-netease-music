import bRequest from '@/service'

// 轮播图
export function getBanners() {
  return bRequest.get({
    url: '/banner'
  })
}

// 热门推荐
export function getHotRecommend(limit = 30) {
  return bRequest.get({
    url: '/personalized',
    params: {
      limit
    }
  })
}

// 新碟专辑
export function getNewAlbum() {
  return bRequest.get({
    url: '/album/newest'
  })
}

// 播放列表详情
export function getPlaylistDetail(id: number) {
  return bRequest.get({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

export function getArtistList(limit = 30) {
  return bRequest.get({
    url: '/artist/list',
    params: {
      limit
    }
  })
}
