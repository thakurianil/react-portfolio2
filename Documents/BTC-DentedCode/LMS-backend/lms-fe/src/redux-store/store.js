import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import bookReducer from "../features/books/bookSlice";
import borrowReducer from "../features/borrow/borrowSlice";
// import reviewReducer from "../features/reviews/reviewSlice";

export default configureStore({
  reducer: {
    userInfo: userReducer,
    bookInfo: bookReducer,
    borrowInfo: borrowReducer,
    // reviewInfo: reviewReducer,
  },
});
