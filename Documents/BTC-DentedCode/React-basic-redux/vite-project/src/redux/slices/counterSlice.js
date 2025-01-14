import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    incremented: (state) => {
      state.value += 1
    },
    decremented: (state) => {
      state.value -= 1
    },
    random: (state) =>{
        state.value *=10
    }
  }
})

export const {reducer, actions} = counterSlice;
export const { incremented, decremented, random } = actions;

export default reducer;