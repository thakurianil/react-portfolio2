import { toast } from "react-toastify";
import {
  deleteBook,
  fetchBooks,
  fetchSingleBook,
  postNewBook,
  updateABook,
} from "./bookAxios";
import { setBooks, setSelectedBook } from "./bookSlice";

export const getAllBooksAction = (isPrivate) => async (dispatch) => {
  // 1. fetch data
  const {books, status} = await fetchBooks(isPrivate);
  // 2. update data
  if(status){
    dispatch(setBooks(books));
  }
};

export const postNewBookAction = (obj) => async (disptch) => {
  // call axios to send data
  const pending = postNewBook(obj);
  toast.promise(pending, {
    pending: "Please wait ...",
    success: pending.message,
  });

  const { status, message } = await pending;
  toast[status](message);
  console.log(status, message);
  // then call function to fetch all the data
};

export const getSingleBookAction = (_id) => async (dispatch) => {
  const { status, books } = await fetchSingleBook(_id);
  if (status) {
    dispatch(setSelectedBook(books));
  }
};

export const updateSingleBookAction = (obj) => async (dispatch) => {
  const pending = updateABook(obj);
  toast.promise(pending, {
    pending: "Please wait....",
  });

  const { status, message } = await pending;
  toast[status](message);

  status === "success" && dispatch(getSingleBookAction(obj._id));

  return {status, message};
};

export const deleteSingleBookAction = (id)=>async(dispatch) =>{
  const pending = deleteBook(id);
  toast.promise(pending, {
    pending: "Please wait ...",
    success: pending.message,
  });

  const { status, message } = await pending;
  toast[status](message);
  console.log(status, message);
  // 2. fetch all update book list
  dispatch(getAllBooksAction(true));
}
