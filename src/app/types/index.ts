export interface IBook {
  _id: string,
  title: string,
  author: string,
  description?: string,
  genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY",
  isbn: number,
  copies: number,
  available: boolean
};

export interface IBorrow<TBook = string> {
  _id: string,
  book: TBook,
  quantity: number,
  dueDate: Date
};