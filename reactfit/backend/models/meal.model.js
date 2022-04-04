const mongoose = require("mongoose");
const Meal = mongoose.model(
  "Meal",
  new mongoose.Schema(
    {
      description: { type: String, required: true },
      calories: { type: Number, required: true },
      date: { type: Date, required: true },
      userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    },
    {
      timestamps: true,
    }
  )
);
module.exports = Meal;
