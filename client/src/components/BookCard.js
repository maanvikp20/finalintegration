import React, { useState } from 'react';
import './BookCard.css';

const BookCard = ({ book, onDelete, onEdit }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
      setIsDeleting(true);
      await onDelete(book.id);
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<span key={i} className="star empty">☆</span>);
    }
    return stars;
  };

  return (
    <div className="book-card">
      <div className="book-header">
        <h3>{book.title}</h3>
        <div className="rating">
          {renderStars(book.rating)}
          <span className="rating-number">{book.rating}</span>
        </div>
      </div>
      
      <p className="author">by {book.author}</p>
      
      <p className="review">{book.review}</p>
      
      <div className="book-footer">
        <span className="date">Reviewed {formatDate(book.createdAt)}</span>
        <div className="actions">
          <button 
            className="btn btn-edit" 
            onClick={() => onEdit(book)}
          >
            Edit
          </button>
          <button 
            className="btn btn-delete" 
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
