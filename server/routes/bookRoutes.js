const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getUserStats
} = require('../controllers/bookController');

// GET /api/books?userId=xxx - Get all books for user
router.get('/', getAllBooks);

// GET /api/books/stats/:userId - Get user statistics
router.get('/stats/:userId', getUserStats);

// GET /api/books/:id - Get single book
router.get('/:id', getBookById);

// POST /api/books - Create new book
router.post('/', createBook);

// PUT /api/books/:id - Update book
router.put('/:id', updateBook);

// DELETE /api/books/:id?userId=xxx - Delete book
router.delete('/:id', deleteBook);

module.exports = router;
