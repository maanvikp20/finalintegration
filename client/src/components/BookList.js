import React from 'react';
import BookCard from './BookCard';
import './BookList.css';

const BookList = ({ books, onDelete, onEdit }) => {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <h3>No books yet</h3>
        <p>Add your first book review to get started!</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      {books.map(book => (
        <BookCard
          key={book.id}
          book={book}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default BookList;
