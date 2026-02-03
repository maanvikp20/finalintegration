import React from 'react';
import { FiBookOpen } from 'react-icons/fi';
import BookCard from './BookCard';
import './BookList.css';

const BookList = ({ books, userId, onDelete, onEdit }) => {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <FiBookOpen className="empty-icon" />
        <h3>No books yet</h3>
        <p>Add your first book review to get started</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      {books.map(book => (
        <BookCard
          key={book._id}
          book={book}
          userId={userId}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default BookList;
