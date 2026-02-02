import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useBooks } from './hooks/useBooks';
import Login from './components/Login';
import Register from './components/Register';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import UserProfile from './components/UserProfile';
import UserStats from './components/UserStats';
import Loading from './components/Loading';
import ErrorDisplay from './components/ErrorDisplay';
import './App.css';

function App() {
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const { books, stats, isLoading, error, fetchBooks, addBook, updateBook, removeBook } = useBooks();
  const [showLogin, setShowLogin] = useState(true);
  const [editingBook, setEditingBook] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleAddBook = async (bookData) => {
    const result = await addBook(bookData);
    if (result.success) {
      setShowForm(false);
    }
    return result;
  };

  const handleUpdateBook = async (bookData) => {
    const result = await updateBook(editingBook.id, bookData);
    if (result.success) {
      setEditingBook(null);
      setShowForm(false);
    }
    return result;
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingBook(null);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    await removeBook(id);
  };

  const handleLogout = () => {
    logout();
    setShowForm(false);
    setEditingBook(null);
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="app">
        <Loading />
      </div>
    );
  }

  // Show login/register if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="app">
        {showLogin ? (
          <Login onSwitchToRegister={() => setShowLogin(false)} />
        ) : (
          <Register onSwitchToLogin={() => setShowLogin(true)} />
        )}
      </div>
    );
  }

  // Show loading while fetching books
  if (isLoading) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>📚 Book Review Dashboard</h1>
          <div className="header-actions">
            <span className="user-greeting">Welcome, {user.username}!</span>
            <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>
        <main className="app-main">
          <Loading />
        </main>
      </div>
    );
  }

  // Show error if there's an error
  if (error) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>📚 Book Review Dashboard</h1>
          <div className="header-actions">
            <span className="user-greeting">Welcome, {user.username}!</span>
            <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>
        <main className="app-main">
          <ErrorDisplay error={error} onRetry={fetchBooks} />
        </main>
      </div>
    );
  }

  // Main application view
  return (
    <div className="app">
      <header className="app-header">
        <h1>📚 Book Review Dashboard</h1>
        <div className="header-actions">
          <span className="user-greeting">Welcome, {user.username}!</span>
          <button 
            className="btn btn-secondary btn-sm" 
            onClick={() => setShowProfile(true)}
          >
            My Profile
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="app-main">
        <UserStats stats={stats} />

        {!showForm && (
          <button 
            className="btn btn-primary btn-add-new" 
            onClick={() => setShowForm(true)}
          >
            + Add New Review
          </button>
        )}

        {showForm ? (
          <BookForm
            onSubmit={editingBook ? handleUpdateBook : handleAddBook}
            onCancel={handleCancel}
            editingBook={editingBook}
          />
        ) : (
          <BookList
            books={books}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Total Reviews: {books.length} | Average Rating: {stats?.averageRating?.toFixed(1) || '0'} ⭐</p>
      </footer>

      {showProfile && (
        <UserProfile onClose={() => setShowProfile(false)} />
      )}
    </div>
  );
}

export default App;
