import express from "express";
import cors from "cors"
import morgan from "morgan"
import bookRouter from "./app/routes/book.routes";
import borrowRouter from "./app/routes/borrow.routes";
import { errorHandler } from "./app/middlewares/errorHandler";
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))
app.use(cors({
  origin: ["*"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));


//routes
app.use("/api/books", bookRouter);
app.use("/api/borrow", borrowRouter);


app.get("/", (req, res) => {
  res.status(200).json({ message: "App is running!", success: true });
});

//not found handler 
app.use((req, res) => {
  res.status(404).json({ message: "Route not found", success: false });
});

//error handler
app.use(errorHandler);
// (err: Error, req: Request, res: Response) => {
//   if (err instanceof mongoose.Error.ValidationError) {
//     res.status(400).json({ message: "Validation Error", success: false, errors: err.errors });
//   } else {
//     res.status(500).json({ message: "Internal Server Error", success: false, error: err });
//   }
// }



export default app