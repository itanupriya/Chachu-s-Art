const express = require("express");
const Design = require("../models/Design");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const generateCode = require("../utils/generateCode");

const router = express.Router();

// GET /api/designs?category=Bike  -> public, anyone can browse
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.category && req.query.category !== "All") {
      filter.category = req.query.category;
    }

    const designs = await Design.find(filter).sort({ createdAt: -1 });
    res.json(designs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not fetch designs" });
  }
});

// POST /api/designs -> admin only, uploads a new design image
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!title || !category) {
      return res.status(400).json({ message: "Title and category are required" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Design image is required" });
    }

    const code = await generateCode(category);
    const imageUrl = `/uploads/${req.file.filename}`;

    const design = await Design.create({ title, category, code, imageUrl });
    res.status(201).json(design);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not upload design" });
  }
});

// DELETE /api/designs/:id -> admin only
router.delete("/:id", protect, async (req, res) => {
  try {
    const design = await Design.findByIdAndDelete(req.params.id);
    if (!design) {
      return res.status(404).json({ message: "Design not found" });
    }
    res.json({ message: "Design deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not delete design" });
  }
});

module.exports = router;
