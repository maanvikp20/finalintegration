import React, { useState, useEffect, useCallback } from 'react';
import { FiPlus, FiBook } from 'react-icons/fi';
import BookCard from '../components/BookCard.jsx';
import BookForm from '../components/BookForm.jsx';
import Modal from '../components/Modal.jsx';
import Loading from '../components/Loading.jsx';
import Error from '../components/Error.jsx';

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const token = localStorage.getItem('token');

  const fetchBooks = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/books', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }

      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleCreateBook = async (formData) => {
    setIsSaving(true);
    setError('');

    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create book');
      }

      const newBook = await response.json();
      setBooks([newBook, ...books]);
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateBook = async (formData) => {
    setIsSaving(true);
    setError('');

    try {
      const response = await fetch(`/api/books/${editingBook._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update book');
      }

      const updatedBook = await response.json();
      setBooks(books.map(book => book._id === updatedBook._id ? updatedBook : book));
      setIsModalOpen(false);
      setEditingBook(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (!window.confirm('Are you sure you want to delete this book review?')) {
      return;
    }

    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete book');
      }

      setBooks(books.filter(book => book._id !== bookId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleOpenModal = (book = null) => {
    setEditingBook(book);
    setIsModalOpen(true);
    setError('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBook(null);
    setError('');
  };

  const handleSubmit = (formData) => {
    if (editingBook) {
      handleUpdateBook(formData);
    } else {
      handleCreateBook(formData);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">My Book Reviews</h1>
        <button onClick={() => handleOpenModal()} className="btn btn-primary">
          <FiPlus />
          Add Book Review
        </button>
      </div>

      {error && <Error message={error} onRetry={fetchBooks} />}

      {books.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <FiBook />
          </div>
          <h2 className="empty-title">No book reviews yet</h2>
          <p className="empty-text">Start adding your book reviews to keep track of your reading journey</p>
          <button onClick={() => handleOpenModal()} className="btn btn-primary">
            <FiPlus />
            Add Your First Review
          </button>
        </div>
      ) : (
        <div className="books-grid">
          {books.map(book => (
            <BookCard
              key={book._id}
              book={book}
              onEdit={handleOpenModal}
              onDelete={handleDeleteBook}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingBook ? 'Edit Book Review' : 'Add Book Review'}
      >
        <BookForm
          book={editingBook}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          isLoading={isSaving}
        />
      </Modal>
    </div>
  );
}

export default Dashboard;
