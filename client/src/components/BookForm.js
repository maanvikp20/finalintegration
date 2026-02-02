import React, { useState, useEffect } from 'react';
import './BookForm.css';

const BookForm = ({ onSubmit, onCancel, editingBook }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    rating: '',
    review: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (editingBook) {
      setFormData({
        title: editingBook.title,
        author: editingBook.author,
        rating: editingBook.rating.toString(),
        review: editingBook.review,
      });
    } else {
      setFormData({
        title: '',
        author: '',
        rating: '',
        review: '',
      });
    }
    setFormError('');
  }, [editingBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.title.trim() || !formData.author.trim() || !formData.review.trim()) {
      setFormError('Please fill in all fields');
      return;
    }

    const rating = parseFloat(formData.rating);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      setFormError('Rating must be between 1 and 5');
      return;
    }

    setIsSaving(true);
    setFormError('');

    const result = await onSubmit({
      ...formData,
      rating: rating,
    });

    setIsSaving(false);

    if (result.success) {
      // Clear form on success
      setFormData({
        title: '',
        author: '',
        rating: '',
        review: '',
      });
    } else {
      setFormError(result.error || 'Failed to save book');
    }
  };

  return (
    <div className="book-form-container">
      <h2>{editingBook ? 'Edit Book Review' : 'Add New Book Review'}</h2>
      
      <form onSubmit={handleSubmit} className="book-form">
        {formError && <div className="form-error">{formError}</div>}
        
        <div className="form-group">
          <label htmlFor="title">Book Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            disabled={isSaving}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author *</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            disabled={isSaving}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating (1-5) *</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Rate from 1 to 5"
            min="1"
            max="5"
            step="0.1"
            disabled={isSaving}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="review">Your Review *</label>
          <textarea
            id="review"
            name="review"
            value={formData.review}
            onChange={handleChange}
            placeholder="Write your review here..."
            rows="4"
            disabled={isSaving}
            required
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : (editingBook ? 'Update Review' : 'Add Review')}
          </button>
          {editingBook && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={isSaving}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookForm;
