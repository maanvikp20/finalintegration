import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

function Error({ message, onRetry }) {
  return (
    <div className="error">
      <FiAlertCircle style={{ marginRight: '0.5rem', fontSize: '1.2rem' }} />
      {message}
      {onRetry && (
        <button onClick={onRetry} className="btn btn-secondary btn-small" style={{ marginLeft: '1rem' }}>
          Retry
        </button>
      )}
    </div>
  );
}

export default Error;
