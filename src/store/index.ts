import { configureStore } from '@reduxjs/toolkit'
import {
  useSelector,
  useDispatch,
  shallowEqual,
  TypedUseSelectorHook
} from 'react-redux'
import counterSlice from './modules/counter'

const store = configureStore({
  reducer: {
    counter: counterSlice
  }
})

type GetStateFnType = typeof store.getState
type IRootState = ReturnType<GetStateFnType>
type DispatchType = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
export const useAppDispatch: () => DispatchType = useDispatch
export const shallowEqualApp = shallowEqual

export default store
