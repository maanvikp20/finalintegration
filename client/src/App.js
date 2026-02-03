import React, { useState, useEffect } from 'react';
import { FiPlus, FiLogOut, FiUser } from 'react-icons/fi';
import Login from './components/Login';
import Register from './components/Register';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import UserStats from './components/UserStats';
import Loading from './components/Loading';
import ErrorDisplay from './components/ErrorDisplay';
import './App.css';

const API_URL = 'http://localhost:5000/api/books';

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBook, setEditingBook] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [refreshStats, setRefreshStats] = useState(0);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      fetchBooks();
    } else {
      setBooks([]);
      setIsLoading(false);
    }
  }, [user]);

  const fetchBooks = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}?userId=${user.id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }

      const data = await response.json();
      setBooks(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setShowForm(false);
    setEditingBook(null);
    setBooks([]);
  };

  const handleBookAdded = (newBook) => {
    setBooks([newBook, ...books]);
    setShowForm(false);
    setRefreshStats(prev => prev + 1);
  };

  const handleBookUpdated = (updatedBook) => {
    setBooks(books.map(book => 
      book._id === updatedBook._id ? updatedBook : book
    ));
    setEditingBook(null);
    setShowForm(false);
    setRefreshStats(prev => prev + 1);
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingBook(null);
    setShowForm(false);
  };

  const handleDelete = (bookId) => {
    setBooks(books.filter(book => book._id !== bookId));
    setRefreshStats(prev => prev + 1);
  };

  if (isLoading && !user) {
    return (
      <div className="app">
        <Loading />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="app auth-page">
        {showLogin ? (
          <Login 
            onLogin={handleLogin} 
            onSwitchToRegister={() => setShowLogin(false)} 
          />
        ) : (
          <Register 
            onLogin={handleLogin} 
            onSwitchToLogin={() => setShowLogin(true)} 
          />
        )}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="app">
        <header className="app-header">
          <div className="container">
            <div className="header-content">
              <h1 className="app-title">Book Review</h1>
              <div className="header-actions">
                <div className="user-info">
                  <FiUser className="user-icon" />
                  <span>{user.username}</span>
                </div>
                <button className="btn-icon" onClick={handleLogout} title="Logout">
                  <FiLogOut />
                </button>
              </div>
            </div>
          </div>
        </header>
        <main className="main-content">
          <div className="container">
            <Loading />
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <header className="app-header">
          <div className="container">
            <div className="header-content">
              <h1 className="app-title">Book Review</h1>
              <div className="header-actions">
                <div className="user-info">
                  <FiUser className="user-icon" />
                  <span>{user.username}</span>
                </div>
                <button className="btn-icon" onClick={handleLogout} title="Logout">
                  <FiLogOut />
                </button>
              </div>
            </div>
          </div>
        </header>
        <main className="main-content">
          <div className="container">
            <ErrorDisplay error={error} onRetry={fetchBooks} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <div className="header-content">
            <h1 className="app-title">Book Review</h1>
            <div className="header-actions">
              <div className="user-info">
                <FiUser className="user-icon" />
                <span>{user.username}</span>
              </div>
              <button className="btn-icon" onClick={handleLogout} title="Logout">
                <FiLogOut />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <UserStats userId={user.id} key={refreshStats} />

          {!showForm && (
            <div className="section-header">
              <h2>My Reviews</h2>
              <button 
                className="btn btn-primary" 
                onClick={() => setShowForm(true)}
              >
                <FiPlus />
                Add Review
              </button>
            </div>
          )}

          {showForm ? (
            <BookForm
              userId={user.id}
              onSuccess={editingBook ? handleBookUpdated : handleBookAdded}
              onCancel={handleCancel}
              editingBook={editingBook}
            />
          ) : (
            <BookList
              books={books}
              userId={user.id}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>{books.length} {books.length === 1 ? 'Review' : 'Reviews'} • MongoDB</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
