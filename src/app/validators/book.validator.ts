import { body } from "express-validator";

export const validateCreateBook = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("title must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("author")
    .notEmpty()
    .withMessage("Author is required")
    .isString()
    .withMessage("author must be a string"),
  body("genre")
    .notEmpty()
    .withMessage("genre is required")
    .isIn(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"])
    .withMessage((value) => `${value} is not supported.`),
  body("isbn")
    .notEmpty()
    .withMessage("ISBN is required")
    .isNumeric()
    .withMessage("ISBN must be a number"),
  body("copies")
    .notEmpty()
    .withMessage("copies is required")
    .isNumeric()
    .withMessage("Copies must be a number")
    .isInt({ min: 0 })
    .withMessage("Copies must be greater a positive number")
  ,
  body("available")
    .optional()
    .isBoolean()
    .withMessage("Available must be a boolean"),
]