const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Category = require("../models/category"); // ✔️ modèle

// GET all
router.get("/", authMiddleware, async (req, res) => {
  try {
    const categories = await Category.find(); // ✔️ variable différente
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newCategory = new Category(req.body); // ✔️ pas de conflit
    await newCategory.save();
    res.json(newCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
