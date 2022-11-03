import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { PlayerWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const Player: FC<IProps> = () => {
  return (
    <PlayerWrapper>
      <div>hello</div>
    </PlayerWrapper>
  )
}

export default memo(Player)
