const mongoose = require("mongoose");
const Exercise = mongoose.model(
  "Exercise",
  new mongoose.Schema(
    {
      description: { type: String, required: true },
      duration: { type: Number, required: true },
      date: { type: Date, required: true },
      userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    },
    {
      timestamps: true,
    }
  )
);
module.exports = Exercise;
