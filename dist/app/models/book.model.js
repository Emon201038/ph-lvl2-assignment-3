"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    author: {
        type: String,
        required: [true, "Author is required"],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    genre: {
        type: String,
        required: [true, "Genre is required"],
        enum: {
            values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
            message: "{VALUE} is not supported."
        }
    },
    isbn: {
        type: Number,
        required: [true, "ISBN is required"],
        unique: [true, "ISBN must be unique"]
    },
    copies: {
        type: Number,
        required: [true, "Copies is required"],
        min: 0
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});
// pre save hook: update available field based on copies
BookSchema.pre("save", function (next) {
    if (this.copies === 0) {
        this.available = false;
    }
    else {
        this.available = true;
    }
    next();
});
// post save hook: update available field based on copies
BookSchema.post("findOneAndUpdate", function (doc, next) {
    if (doc.copies === 0) {
        doc.available = false;
    }
    else {
        doc.available = true;
    }
    next();
});
const Book = (0, mongoose_1.model)("Book", BookSchema);
exports.default = Book;
