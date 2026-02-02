const Book = require('../models/Book');

// Get all books for the logged-in user
const getAllBooks = (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    setTimeout(() => {
      const books = Book.getAll(userId);
      res.status(200).json(books);
    }, 500);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

// Get single book by ID
const getBookById = (req, res) => {
  try {
    const { id } = req.params;
    const book = Book.getById(id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch book' });
  }
};

// Create new book
const createBook = (req, res) => {
  try {
    const { userId, title, author, rating, review } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Validate input
    const errors = Book.validate({ title, author, rating, review });
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(', ') });
    }

    // Create book
    const newBook = Book.create({ userId, title, author, rating, review });

    setTimeout(() => {
      res.status(201).json(newBook);
    }, 300);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create book' });
  }
};

// Update book
const updateBook = (req, res) => {
  try {
    const { id } = req.params;
    const { userId, title, author, rating, review } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Check if book exists
    const existingBook = Book.getById(id);
    if (!existingBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Validate input
    const errors = Book.validate({ title, author, rating, review });
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(', ') });
    }

    // Update book
    const result = Book.update(id, userId, { title, author, rating, review });

    if (result.error) {
      return res.status(403).json({ error: result.error });
    }

    setTimeout(() => {
      res.status(200).json(result);
    }, 300);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update book' });
  }
};

// Delete book
const deleteBook = (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Delete book
    const result = Book.delete(id, userId);

    if (result.error) {
      if (result.error === 'Book not found') {
        return res.status(404).json({ error: result.error });
      }
      return res.status(403).json({ error: result.error });
    }

    setTimeout(() => {
      res.status(204).send();
    }, 300);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
};

// Get user statistics
const getUserStats = (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const stats = Book.getUserStats(userId);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get statistics' });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getUserStats
};
