import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiUser } from 'react-icons/fi';

function Header({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          Book Review
        </Link>
        {user && (
          <div className="header-actions">
            <div className="user-info">
              <FiUser style={{ marginRight: '0.5rem' }} />
              {user.username}
            </div>
            <button onClick={handleLogout} className="btn btn-secondary btn-small">
              <FiLogOut />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
