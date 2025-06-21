import { Model, Schema } from "mongoose"

export interface IBook {
  _id: Schema.Types.ObjectId,
  title: string,
  author: string,
  description?: string,
  genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY",
  isbn: number,
  copies: number,
  available: boolean
};

export interface IBorrow<BookID = Schema.Types.ObjectId> {
  _id: Schema.Types.ObjectId,
  book: BookID,
  quantity: number,
  dueDate: Date
};

export interface IBookModelType extends Model<IBook> {
  isBookAvailable: (bookId: Schema.Types.ObjectId, quantity: number) => Promise<boolean>
  updateCopies: (bookId: Schema.Types.ObjectId, quantity: number) => Promise<IBook | null>
}