import React, { useState, useEffect } from 'react';
import { FiBook, FiUser, FiStar, FiFileText, FiSave, FiX } from 'react-icons/fi';
import './BookForm.css';

const API_URL = 'http://localhost:5000/api/books';

const BookForm = ({ userId, onSuccess, onCancel, editingBook }) => {
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

    try {
      const bookData = {
        userId,
        title: formData.title,
        author: formData.author,
        rating: rating,
        review: formData.review,
      };

      const url = editingBook 
        ? `${API_URL}/${editingBook._id}` 
        : API_URL;
      
      const method = editingBook ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save book');
      }

      onSuccess(data);
      
      if (!editingBook) {
        setFormData({
          title: '',
          author: '',
          rating: '',
          review: '',
        });
      }
    } catch (error) {
      setFormError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="book-form-container">
      <div className="form-header">
        <h2>{editingBook ? 'Edit Review' : 'Add New Review'}</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="book-form">
        {formError && (
          <div className="alert alert-error">
            {formError}
          </div>
        )}
        
        <div className="input-group">
          <label htmlFor="title">Book Title</label>
          <div className="input-wrapper">
            <FiBook className="input-icon" />
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
        </div>

        <div className="input-group">
          <label htmlFor="author">Author</label>
          <div className="input-wrapper">
            <FiUser className="input-icon" />
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
        </div>

        <div className="input-group">
          <label htmlFor="rating">Rating (1-5)</label>
          <div className="input-wrapper">
            <FiStar className="input-icon" />
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
        </div>

        <div className="input-group">
          <label htmlFor="review">Your Review</label>
          <div className="input-wrapper">
            <FiFileText className="input-icon textarea-icon" />
            <textarea
              id="review"
              name="review"
              value={formData.review}
              onChange={handleChange}
              placeholder="Write your review..."
              rows="4"
              disabled={isSaving}
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSaving}
          >
            <FiSave />
            {isSaving ? 'Saving...' : (editingBook ? 'Update' : 'Add Review')}
          </button>
          {editingBook && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={isSaving}
            >
              <FiX />
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookForm;
