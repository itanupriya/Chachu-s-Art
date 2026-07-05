const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    designCode: { type: String, required: true },
    designTitle: { type: String, required: true },
    message: { type: String }, // whatever text was sent to WhatsApp
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inquiry", inquirySchema);
