import { NextFunction, Request, Response } from "express"
import { successResponse } from "./response.controller"
import Borrow from "../models/borrow.model";
import { throwGenericError } from "../helper/throwGenericError";
import Book from "../models/book.model";

export const getBorrowedBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await Borrow.aggregate(
      [
        {
          $lookup: {
            from: "books",
            localField: "book",
            foreignField: "_id",
            as: "book"
          }
        },
        {
          $unwind: "$book"
        },
        {
          $group: {
            _id: "$book._id",
            book: { $first: "$book" },
            totalQuantity: { $sum: "$quantity" }
          }
        },
        {
          $project: {
            _id: 0,
            book: {
              title: "$book.title",
              isbn: "$book.isbn"
            },
            totalQuantity: 1
          }
        }
      ]
    )
    successResponse(res, { message: "Borrowed books summary retrieved successfully.", success: true, payload: books })
  } catch (error) {
    next(error)
  }
};

export const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const mongooseIdRegx = /^[0-9a-fA-F]{24}$/;
    if (!mongooseIdRegx.test(req.body.book)) {
      // throw generic error as assignment requirement
      throw throwGenericError("InvalidMongooseID", "Invalid book id. Please provide a valid book id.", "book", req.body.book, 400, "ObjectID");
    }

    const isBookExists = await Book.exists({ _id: req.body.book });
    if (!isBookExists) {
      throw {
        statusCode: 404,
        message: "Book is not found.",
      }
    }
    const borrow = await Borrow.create(req.body);
    successResponse(res, { message: "Book borrowed successfully.", success: true, statusCode: 201, payload: borrow })
  } catch (error) {
    next(error)
  }
};

export const getSingleBorrowBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const borrowId = req.params.borrowId;
    const mongooseIdRegx = /^[0-9a-fA-F]{24}$/;
    if (!mongooseIdRegx.test(borrowId)) {
      // throw generic error as assignment requirement
      throw throwGenericError("InvalidMongooseID", "Invalid book id. Please provide a valid book id.", "borrowId", borrowId, 400, "ObjectID");
    };

    const borrow = await Borrow.findById(borrowId);

    if (!borrow) {
      throw {
        statusCode: 404,
        message: "Borrow is not found.",
      }
    };

    successResponse(res, { message: "Borrowed book is found successfully.", success: true, payload: borrow })
  } catch (error) {
    next(error)
  }
};

export const updateBorrowBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    successResponse(res, { message: "Borrowed book is updated successfully.", success: true })
  } catch (error) {
    next(error)
  }
};

export const deleteBorrowBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    successResponse(res, { message: "Borrowed book is deleted successfully.", success: true })
  } catch (error) {
    next(error)
  }
};