const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const authMiddleware = require("../middleware/authMiddleware");

// GET all books (avec la catégorie)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const books = await Book.find().populate("category"); // 🔥 ajoute la catégorie complète
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new book
router.post("/", authMiddleware, async (req, res) => {
  try {
    const book = new Book(req.body); // req.body doit contenir category: "id"
    await book.save();
    const populatedBook = await book.populate("category"); // 🔥 renvoyer le book avec category
    res.json(populatedBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update book
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("category"); // 🔥 renvoyer la catégorie mise à jour

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE book
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
