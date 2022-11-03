import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { shallowEqualApp, useAppSelector } from '@/store'
import AreaHeaderV1 from '@/components/area-header-v1'
import SongMenuItem from '@/components/song-menu-item'
import { HotWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const HotRecommend: FC<IProps> = () => {
  const { hotRecommends } = useAppSelector(
    (state) => ({
      hotRecommends: state.recommend.hotRecommends
    }),
    shallowEqualApp
  )

  return (
    <HotWrapper>
      <AreaHeaderV1
        title="热门推荐"
        keywords={['华语', '流行', '摇滚', '民谣', '电子']}
        moreLink="/discover/songs"
      />
      <div className="recommend-list">
        {hotRecommends.map((item) => (
          <SongMenuItem key={item.id} itemData={item} />
        ))}
      </div>
    </HotWrapper>
  )
}

export default memo(HotRecommend)
