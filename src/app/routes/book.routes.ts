import express from "express";
import { createBook, deleteBook, getBooks, getSingleBook, updateBook } from "../controller/book.controller";
// import { validateCreateBook } from "../validators/book.validator";
// import runValidation from "../validators";

const bookRouter = express.Router();

// http://localhost:3000/api/books
bookRouter.route("/")
  .get(getBooks)
  .post(
    // validateCreateBook, // this validation is commented out because it is not returning provided validation only mongoose return provided type error. 
    // runValidation,
    createBook);

// http://localhost:3000/api/books/:bookId
bookRouter.route("/:bookId")
  .get(getSingleBook)
  .put(updateBook)
  .delete(deleteBook);

export default bookRouter