import express from 'express';
import Book from '../models/Book.js';

const router = express.Router();

// GET /api/books → Fetch all books sorted by createdAt (newest first)
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error: Unable to fetch books.' });
  }
});

export default router;
