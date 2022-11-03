import React, { memo, useRef, useState, useEffect } from 'react'
import type { FC, ReactNode, ElementRef } from 'react'
import { Carousel } from 'antd'
import classNames from 'classnames'

import { shallowEqualApp, useAppSelector } from '@/store'
import { BannerControl, BannerLeft, BannerRight, BannerWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const RecommendBanner: FC<IProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [bgImageUrl, setBgImageUrl] = useState('')
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)

  // store 数据
  const { banners } = useAppSelector(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqualApp
  )

  // 监听轮播切换
  useEffect(() => {
    if (banners.length === 0) return
    setBgImageUrl(`${banners[currentIndex].imageUrl}?imageView&blur=40x20`)
  }, [banners, currentIndex])

  // 事件处理
  function handleAfterChange(current: number) {
    setCurrentIndex(current)
  }
  const handlePrevClick = () => {
    bannerRef.current?.prev()
  }
  const handleNextClick = () => {
    bannerRef.current?.next()
  }

  return (
    <BannerWrapper
      style={{ background: `url('${bgImageUrl}') center center / 6000px` }}
    >
      <div className="c-banner">
        <BannerLeft>
          <Carousel
            autoplay
            dots={false}
            effect="fade"
            ref={bannerRef}
            afterChange={handleAfterChange}
          >
            {banners.map((item) => (
              <div className="banner-item" key={item.imageUrl}>
                <img
                  className="image"
                  src={item.imageUrl}
                  alt={item.typeTitle}
                />
              </div>
            ))}
          </Carousel>
          {/* 轮播的点 */}
          <ul className="dots">
            {banners.map((item, index) => {
              return (
                <li key={item.imageUrl}>
                  <span
                    className={classNames('item', {
                      active: index === currentIndex
                    })}
                  ></span>
                </li>
              )
            })}
          </ul>
        </BannerLeft>

        <BannerRight>
          <div className="desc">PC 安卓 iPhone WP iPad Mac 六大客户端</div>
        </BannerRight>

        <BannerControl>
          <button className="btn left" onClick={handlePrevClick}></button>
          <button className="btn right" onClick={handleNextClick}></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
}

export default memo(RecommendBanner)
