import React from 'react';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import './ErrorDisplay.css';

const ErrorDisplay = ({ error, onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-content">
        <FiAlertCircle className="error-icon" />
        <h3>Something went wrong</h3>
        <p>{error}</p>
        {onRetry && (
          <button className="btn btn-primary" onClick={onRetry}>
            <FiRefreshCw />
            Try Again
          </button>
        )}
        <p className="error-hint">
          Make sure MongoDB and the backend server are running
        </p>
      </div>
    </div>
  );
};

export default ErrorDisplay;
