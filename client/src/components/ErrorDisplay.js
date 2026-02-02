import React from 'react';
import './ErrorDisplay.css';

const ErrorDisplay = ({ error, onRetry }) => {
  return (
    <div className="error-container">
      <h2>⚠️ Error Loading Books</h2>
      <p>{error}</p>
      <button className="btn btn-primary" onClick={onRetry}>
        Try Again
      </button>
      <p className="error-hint">
        Make sure the backend server is running on http://localhost:5000
      </p>
    </div>
  );
};

export default ErrorDisplay;
