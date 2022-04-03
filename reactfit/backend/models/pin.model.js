const mongoose = require("mongoose");
const Pin = mongoose.model(
  "Pin",
  new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
        min: 1,
        max: 60,
      },
      description: {
        type: String,
        required: true,
        min: 1,
      },
      rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
      },
      long: {
        type: Number,
        required: true,
      },
      lat: {
        type: Number,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
module.exports = Pin;
