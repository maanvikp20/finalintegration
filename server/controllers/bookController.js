const Book = require('../models/Book');

// Get all books for a user
const getAllBooks = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const books = await Book.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

// Get single book
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error('Get book error:', error);
    res.status(500).json({ error: 'Failed to fetch book' });
  }
};

// Create new book
const createBook = async (req, res) => {
  try {
    const { userId, title, author, rating, review } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const book = new Book({
      userId,
      title,
      author,
      rating,
      review
    });

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    console.error('Create book error:', error);
    res.status(500).json({ error: 'Failed to create book' });
  }
};

// Update book
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, title, author, rating, review } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Check if book exists and belongs to user
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (book.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized to update this book' });
    }

    // Update book
    book.title = title;
    book.author = author;
    book.rating = rating;
    book.review = review;

    await book.save();
    res.status(200).json(book);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    console.error('Update book error:', error);
    res.status(500).json({ error: 'Failed to update book' });
  }
};

// Delete book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Check if book exists and belongs to user
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (book.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized to delete this book' });
    }

    await Book.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    console.error('Delete book error:', error);
    res.status(500).json({ error: 'Failed to delete book' });
  }
};

// Get user statistics
const getUserStats = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const books = await Book.find({ userId });

    if (books.length === 0) {
      return res.status(200).json({
        totalBooks: 0,
        averageRating: 0,
        highestRated: null,
        recentReview: null
      });
    }

    const totalRating = books.reduce((sum, book) => sum + book.rating, 0);
    const averageRating = totalRating / books.length;

    const highestRated = books.reduce((max, book) => 
      book.rating > max.rating ? book : max
    );

    const sortedBooks = books.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
    const recentReview = sortedBooks[0];

    res.status(200).json({
      totalBooks: books.length,
      averageRating: parseFloat(averageRating.toFixed(2)),
      highestRated,
      recentReview
    });
  } catch (error) {
    console.error('Get stats error:', error);
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
