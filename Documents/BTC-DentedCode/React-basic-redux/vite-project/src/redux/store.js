import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import b1 from "./slices/bookSlice"
const store = configureStore({
    reducer: {
      counter: counterReducer,
      book:b1,
    },
  });

export default store;