import React from 'react';
import './UserStats.css';

const UserStats = ({ stats }) => {
  if (!stats || stats.totalBooks === 0) {
    return (
      <div className="stats-container">
        <h3>📊 Your Reading Statistics</h3>
        <p className="stats-empty">Start adding book reviews to see your statistics!</p>
      </div>
    );
  }

  return (
    <div className="stats-container">
      <h3>📊 Your Reading Statistics</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-value">{stats.totalBooks}</div>
          <div className="stat-label">Books Reviewed</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-value">{stats.averageRating.toFixed(1)}</div>
          <div className="stat-label">Average Rating</div>
        </div>

        {stats.highestRated && (
          <div className="stat-card highlight">
            <div className="stat-icon">🏆</div>
            <div className="stat-value">{stats.highestRated.rating}</div>
            <div className="stat-label">
              Highest Rated
              <br />
              <span className="stat-book-title">{stats.highestRated.title}</span>
            </div>
          </div>
        )}

        {stats.recentReview && (
          <div className="stat-card">
            <div className="stat-icon">📖</div>
            <div className="stat-label">
              Latest Review
              <br />
              <span className="stat-book-title">{stats.recentReview.title}</span>
              <br />
              <span className="stat-date">
                {new Date(stats.recentReview.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserStats;
