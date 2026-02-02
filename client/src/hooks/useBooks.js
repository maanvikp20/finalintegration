import { useState, useEffect } from 'react';
import * as bookService from '../services/bookService';
import { useAuth } from '../context/AuthContext';

export const useBooks = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all books when user changes
  useEffect(() => {
    if (user) {
      fetchBooks();
      fetchStats();
    } else {
      setBooks([]);
      setStats(null);
      setIsLoading(false);
    }
  }, [user]);

  const fetchBooks = async () => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    
    const result = await bookService.getAllBooks(user.id);
    
    if (result.success) {
      setBooks(result.data);
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  const fetchStats = async () => {
    if (!user) return;
    
    const result = await bookService.getUserStats(user.id);
    
    if (result.success) {
      setStats(result.data);
    }
  };

  const addBook = async (bookData) => {
    if (!user) return { success: false, error: 'User not logged in' };
    
    setError(null);
    
    const result = await bookService.createBook({
      ...bookData,
      userId: user.id
    });
    
    if (result.success) {
      setBooks(prevBooks => [...prevBooks, result.data]);
      await fetchStats();
      return { success: true, data: result.data };
    } else {
      setError(result.error);
      return { success: false, error: result.error };
    }
  };

  const updateBook = async (id, bookData) => {
    if (!user) return { success: false, error: 'User not logged in' };
    
    setError(null);
    
    const result = await bookService.updateBook(id, {
      ...bookData,
      userId: user.id
    });
    
    if (result.success) {
      setBooks(prevBooks =>
        prevBooks.map(book => (book.id === id ? result.data : book))
      );
      await fetchStats();
      return { success: true, data: result.data };
    } else {
      setError(result.error);
      return { success: false, error: result.error };
    }
  };

  const removeBook = async (id) => {
    if (!user) return { success: false, error: 'User not logged in' };
    
    setError(null);
    
    const result = await bookService.deleteBook(id, user.id);
    
    if (result.success) {
      setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
      await fetchStats();
      return { success: true };
    } else {
      setError(result.error);
      return { success: false, error: result.error };
    }
  };

  return {
    books,
    stats,
    isLoading,
    error,
    fetchBooks,
    addBook,
    updateBook,
    removeBook,
  };
};
