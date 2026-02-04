import React, { useState, useEffect } from 'react';
import { FiStar } from 'react-icons/fi';

function BookForm({ book, onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    rating: 0,
    review: '',
    genre: '',
    dateRead: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        rating: book.rating,
        review: book.review,
        genre: book.genre,
        dateRead: new Date(book.dateRead).toISOString().split('T')[0]
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Author</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Genre</label>
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="form-input"
          placeholder="e.g., Fiction, Non-fiction, Mystery"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Rating</label>
        <div className="rating-input">
          {[1, 2, 3, 4, 5].map((star) => (
            <FiStar
              key={star}
              className={`rating-star ${star <= formData.rating ? 'filled' : ''}`}
              onClick={() => handleRatingClick(star)}
              fill={star <= formData.rating ? '#ffa500' : 'none'}
            />
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Review</label>
        <textarea
          name="review"
          value={formData.review}
          onChange={handleChange}
          className="form-textarea"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Date Read</label>
        <input
          type="date"
          name="dateRead"
          value={formData.dateRead}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      <div className="modal-footer">
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : book ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}

export default BookForm;
