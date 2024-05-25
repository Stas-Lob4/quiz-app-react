import { SessionStateT } from '@/store/slices/session/session.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: SessionStateT = {
  activeQuiz: null,
  countCorrectAnswer: null,
  time: null,
}

const slice = createSlice({
  initialState,
  name: 'session',
  reducers: {
    addCorrectAnswer: state => {
      if (state.countCorrectAnswer === null) {
        state.countCorrectAnswer = 1
      }
      state.countCorrectAnswer++
    },
    addTime: (state, action: PayloadAction<{ time: number }>) => {
      state.time = action.payload.time
    },
  },
})

export const sessionActions = slice.actions
export default slice.reducer
