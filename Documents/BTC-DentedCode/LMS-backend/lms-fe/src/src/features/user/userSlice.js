import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  menu: '',
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setMenu: (state, action) => {
      state.menu = action.payload;
    },

  },
});

const { reducer, actions } = userSlice;

export const { setUser,setMenu } = actions;

export default reducer;
