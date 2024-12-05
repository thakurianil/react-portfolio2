import express from "express";

import { auth, isAdmin } from "../middlewares/authMiddleware.js";
import {
  newBookValidation,
  updateBookValidation,
} from "../middlewares/joiValidation.js";
import {
  deleteABookById,
  getABookById,
  getAllBooks,
  insertBook,
  updateABookById,
} from "../models/books/BookModel.js";
const router = express.Router();

//Private controllers create new book
router.post("/", auth, isAdmin, newBookValidation, async (req, res, next) => {
  try {
    const book = await insertBook(req.body);
    book?._id
      ? res.json({
          status: "success",
          message: "The new book has been added successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to add the book, try agian later",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key")) {
      error.message =
        "Another Book with same ISBN alreay exist, change the detail and try again";
      error.status = 200;
    }
    next(error);
  }
});

router.put(
  "/:_id",
  auth,
  isAdmin,
  updateBookValidation,
  async (req, res, next) => {
    try {
      const { _id } = req.params;
      const { ...rest } = req.body;
      const update = await updateABookById(_id, rest);
      update?._id
        ? res.json({
            status: "success",
            message: "The book has been updated",
          })
        : res.json({
            status: "error",
            message: "Unable to update the book, try again later",
          });
    } catch (error) {
      next(error);
    }
  }
);

// get all books
router.get("/all", auth, isAdmin, async (req, res, next) => {
  try {
    // get all active books
    const books = await getAllBooks();

    res.json({
      status: "success",
      books,
    });
  } catch (error) {
    next(error);
  }
});

// delete book
router.delete("/:_id", auth, isAdmin, async (req, res, next) => {
  try {
    const { _id } = req.params;

    const response = await deleteABookById(_id);

    res.json({
      status: "success",
      message: "Book deleted!",
    });
  } catch (error) {
    next(error);
  }
});

///====== public controllers
router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    // get all active books
    const books = _id
      ? await getABookById(_id)
      : await getAllBooks({ status: "active" });

    res.json({
      status: "success",
      books,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
