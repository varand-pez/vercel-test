const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is a required field"],
      unique: true,
      trim: true,
      maxlength: [40, "Title cannot be more than 40 characters"],
    },
    description: {
      type: String,
      required: true,
      maxlength: [400, "Description cannot be more than 400 characters"],
    },
  },
  { collection: "notes" }
);

module.exports = mongoose.models.Note || mongoose.model("Note", NoteSchema);
