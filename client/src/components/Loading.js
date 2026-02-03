import React from 'react';
import { FiLoader } from 'react-icons/fi';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <FiLoader className="loading-spinner" />
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
