const express = require("express");
const Inquiry = require("../models/Inquiry");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// POST /api/inquiries -> public, called right before redirecting to WhatsApp
router.post("/", async (req, res) => {
  try {
    const { designCode, designTitle, message } = req.body;

    if (!designCode || !designTitle) {
      return res.status(400).json({ message: "designCode and designTitle are required" });
    }

    const inquiry = await Inquiry.create({ designCode, designTitle, message });
    res.status(201).json(inquiry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not save inquiry" });
  }
});

// GET /api/inquiries -> admin only, so chachu can see who asked about what
router.get("/", protect, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not fetch inquiries" });
  }
});

module.exports = router;
