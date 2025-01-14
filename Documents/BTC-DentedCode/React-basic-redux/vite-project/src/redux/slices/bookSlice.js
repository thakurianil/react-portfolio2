import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'books',
  initialState: {
    title: "HEllo",
    author: "HElp"
  },
  reducers: {
    updateTitle : (state , {payload})=>{
        state.title = payload;
    }
    
  }
})

export const {reducer, actions} = counterSlice;
export const { updateTitle } = actions;

export default reducer;