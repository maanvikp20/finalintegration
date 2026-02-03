import React, { useState, useEffect } from 'react';
import { FiBook, FiStar, FiTrendingUp, FiClock } from 'react-icons/fi';
import './UserStats.css';

const API_URL = 'http://localhost:5000/api/books';

const UserStats = ({ userId }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchStats();
    }
  }, [userId]);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/stats/${userId}`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  if (!stats || stats.totalBooks === 0) {
    return null;
  }

  return (
    <div className="stats-container">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <FiBook className="stat-icon" />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalBooks}</div>
            <div className="stat-label">Books Reviewed</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <FiStar className="stat-icon" />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.averageRating.toFixed(1)}</div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>

        {stats.highestRated && (
          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <FiTrendingUp className="stat-icon" />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.highestRated.rating}</div>
              <div className="stat-label">
                Highest Rated
                <div className="stat-subtitle">{stats.highestRated.title}</div>
              </div>
            </div>
          </div>
        )}

        {stats.recentReview && (
          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <FiClock className="stat-icon" />
            </div>
            <div className="stat-content">
              <div className="stat-label">
                Latest Review
                <div className="stat-subtitle">{stats.recentReview.title}</div>
                <div className="stat-date">
                  {new Date(stats.recentReview.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserStats;
