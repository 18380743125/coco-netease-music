import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

import { discoverMenu } from '@/assets/data/local_data'
import { NavWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const DiscoverNav: FC<IProps> = () => {
  return (
    <NavWrapper>
      <div className="nav">
        {discoverMenu.map((item) => (
          <div className="item" key={item.link}>
            <NavLink to={item.link}>{item.title}</NavLink>
          </div>
        ))}
      </div>
    </NavWrapper>
  )
}

export default memo(DiscoverNav)
