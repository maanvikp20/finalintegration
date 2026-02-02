// In-memory database simulation
let books = [
  {
    id: 1,
    userId: 1, // Associated with demo user
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    rating: 4.5,
    review: "A masterpiece of American literature exploring themes of wealth and love.",
    createdAt: new Date('2024-01-15').toISOString()
  },
  {
    id: 2,
    userId: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    rating: 5,
    review: "An important novel about justice and morality in the American South.",
    createdAt: new Date('2024-01-20').toISOString()
  },
  {
    id: 3,
    userId: 1,
    title: "1984",
    author: "George Orwell",
    rating: 4.8,
    review: "A chilling dystopian vision that remains relevant today.",
    createdAt: new Date('2024-01-25').toISOString()
  }
];

let nextId = 4;

class Book {
  constructor(data) {
    this.id = data.id || nextId++;
    this.userId = data.userId;
    this.title = data.title;
    this.author = data.author;
    this.rating = parseFloat(data.rating);
    this.review = data.review;
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  // Validation
  static validate(data) {
    const errors = [];

    if (!data.title || data.title.trim() === '') {
      errors.push('Title is required');
    }

    if (!data.author || data.author.trim() === '') {
      errors.push('Author is required');
    }

    if (!data.rating) {
      errors.push('Rating is required');
    } else {
      const rating = parseFloat(data.rating);
      if (isNaN(rating) || rating < 1 || rating > 5) {
        errors.push('Rating must be between 1 and 5');
      }
    }

    if (!data.review || data.review.trim() === '') {
      errors.push('Review is required');
    }

    return errors;
  }

  // Get all books (optionally filter by user)
  static getAll(userId = null) {
    if (userId) {
      return books.filter(book => book.userId === parseInt(userId));
    }
    return books;
  }

  // Get book by ID
  static getById(id) {
    return books.find(book => book.id === parseInt(id));
  }

  // Create new book
  static create(data) {
    const newBook = new Book(data);
    books.push(newBook);
    return newBook;
  }

  // Update book (only if user owns it)
  static update(id, userId, data) {
    const index = books.findIndex(book => book.id === parseInt(id));
    if (index === -1) {
      return null;
    }

    // Check if user owns this book
    if (books[index].userId !== parseInt(userId)) {
      return { error: 'Unauthorized' };
    }

    const updatedBook = {
      ...books[index],
      title: data.title,
      author: data.author,
      rating: parseFloat(data.rating),
      review: data.review
    };

    books[index] = updatedBook;
    return updatedBook;
  }

  // Delete book (only if user owns it)
  static delete(id, userId) {
    const index = books.findIndex(book => book.id === parseInt(id));
    if (index === -1) {
      return { error: 'Book not found' };
    }

    // Check if user owns this book
    if (books[index].userId !== parseInt(userId)) {
      return { error: 'Unauthorized' };
    }

    books.splice(index, 1);
    return { success: true };
  }

  // Get statistics for a user
  static getUserStats(userId) {
    const userBooks = books.filter(book => book.userId === parseInt(userId));
    
    if (userBooks.length === 0) {
      return {
        totalBooks: 0,
        averageRating: 0,
        highestRated: null,
        recentReview: null
      };
    }

    const totalRating = userBooks.reduce((sum, book) => sum + book.rating, 0);
    const averageRating = (totalRating / userBooks.length).toFixed(2);
    
    const highestRated = userBooks.reduce((max, book) => 
      book.rating > max.rating ? book : max
    );

    const recentReview = userBooks.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    )[0];

    return {
      totalBooks: userBooks.length,
      averageRating: parseFloat(averageRating),
      highestRated,
      recentReview
    };
  }
}

module.exports = Book;
