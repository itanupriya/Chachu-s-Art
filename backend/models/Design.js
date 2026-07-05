const mongoose = require("mongoose");

const designSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["Bike", "Car", "Glass", "Wall", "Helmet", "Other"],
    },
    code: { type: String, required: true, unique: true }, // e.g. BIKE-043
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Design", designSchema);
