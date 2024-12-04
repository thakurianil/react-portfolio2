import { apiProcesser } from "../../helpers/axiosHelper";

const bookEP = import.meta.env.VITE_APP_ROOT_SERVER + "/api/v1/books";

export const fetchBooks = async (isPrivate) => {
  const axiosObj = {
    method: "get",
    url: isPrivate ? bookEP + "/all" : bookEP,
    isPrivate: true,
  };
  return apiProcesser(axiosObj);
};

// CRUD PAGES
export const postNewBook = async (obj) => {
  const axiosObj = {
    method: "post",
    url: bookEP,
    data: obj,
    isPrivate: true,
  };
  return apiProcesser(axiosObj);
};

export const fetchSingleBook = async (_id) => {
  const axiosObj = {
    method: "get",
    url: bookEP + "/" + _id,
  };
  return apiProcesser(axiosObj);
};

export const updateABook = async ({_id, ...obj}) => {
  const axiosObj = {
    method: "put",
    url: bookEP + "/" + _id,
    data: obj,
    isPrivate: true,
  };
  return apiProcesser(axiosObj);
};

export const deleteBook = async (_id)=>{

  const axiosObj = {
    method: "delete",
    url: bookEP + "/" + _id,
    isPrivate: true,
  };

  return apiProcesser(axiosObj);

};
