import React from 'react';
import { FiEdit2, FiTrash2, FiStar } from 'react-icons/fi';

function BookCard({ book, onEdit, onDelete }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FiStar
        key={index}
        fill={index < rating ? '#ffa500' : 'none'}
        color={index < rating ? '#ffa500' : '#d1d1d1'}
      />
    ));
  };

  return (
    <div className="book-card">
      <div className="book-header">
        <div>
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">by {book.author}</p>
        </div>
        <div className="book-rating">
          {renderStars(book.rating)}
        </div>
      </div>
      
      <div className="book-info">
        <span className="book-genre">{book.genre}</span>
        <p className="book-review">{book.review}</p>
        <p className="book-date">Read on {formatDate(book.dateRead)}</p>
      </div>

      <div className="book-actions">
        <button onClick={() => onEdit(book)} className="btn btn-secondary btn-small">
          <FiEdit2 />
          Edit
        </button>
        <button onClick={() => onDelete(book._id)} className="btn btn-danger btn-small">
          <FiTrash2 />
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookCard;
