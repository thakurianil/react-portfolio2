import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  selectedBook: {},
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload || [];
    },
    setSelectedBook: (state, { payload }) => {
      state.selectedBook = payload;
    },
  },
});

const { reducer, actions } = bookSlice;

export const { setBooks, setSelectedBook } = actions;
export default reducer;
