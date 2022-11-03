import { configureStore } from '@reduxjs/toolkit'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

import recommendReducer from '@/pages/discover/c-pages/recommed/store/recommend'
import playerReducer from '@/pages/player/store/player'

const store = configureStore({
  reducer: {
    recommend: recommendReducer,
    player: playerReducer
  }
})

type GetStateFnType = typeof store.getState
type IRootState = ReturnType<GetStateFnType>
type DispatchType = typeof store.dispatch

export type { IRootState }
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
export const useAppDispatch: () => DispatchType = useDispatch
export const shallowEqualApp = shallowEqual

export default store
