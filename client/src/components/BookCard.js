import React, { useState } from 'react';
import { FiStar, FiEdit2, FiTrash2, FiCalendar } from 'react-icons/fi';
import './BookCard.css';

const API_URL = 'http://localhost:5000/api/books';

const BookCard = ({ book, userId, onDelete, onEdit }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Delete "${book.title}"?`)) {
      setIsDeleting(true);
      
      try {
        const response = await fetch(`${API_URL}/${book._id}?userId=${userId}`, {
          method: 'DELETE',
        });

        if (response.ok || response.status === 204) {
          onDelete(book._id);
        } else {
          const data = await response.json();
          alert(data.error || 'Failed to delete book');
        }
      } catch (error) {
        alert('Error deleting book: ' + error.message);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="book-card">
      <div className="book-card-header">
        <h3 className="book-title">{book.title}</h3>
        <div className="book-rating">
          <FiStar className="star-icon" />
          <span>{book.rating}</span>
        </div>
      </div>
      
      <p className="book-author">{book.author}</p>
      
      <p className="book-review">{book.review}</p>
      
      <div className="book-card-footer">
        <div className="book-date">
          <FiCalendar className="calendar-icon" />
          <span>{formatDate(book.createdAt)}</span>
        </div>
        <div className="book-actions">
          <button 
            className="icon-btn" 
            onClick={() => onEdit(book)}
            title="Edit"
          >
            <FiEdit2 />
          </button>
          <button 
            className="icon-btn icon-btn-danger" 
            onClick={handleDelete}
            disabled={isDeleting}
            title="Delete"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
