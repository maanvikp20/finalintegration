const API_BASE_URL = 'http://localhost:5000/api/books';

// GET all books for user
export const getAllBooks = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}?userId=${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching books:', error);
    return { success: false, error: error.message };
  }
};

// GET single book by ID
export const getBookById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching book:', error);
    return { success: false, error: error.message };
  }
};

// POST - Create new book
export const createBook = async (bookData) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create book');
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Error creating book:', error);
    return { success: false, error: error.message };
  }
};

// PUT - Update book
export const updateBook = async (id, bookData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to update book');
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Error updating book:', error);
    return { success: false, error: error.message };
  }
};

// DELETE - Delete book
export const deleteBook = async (id, userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}?userId=${userId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok && response.status !== 204) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to delete book');
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting book:', error);
    return { success: false, error: error.message };
  }
};

// GET user statistics
export const getUserStats = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/stats/${userId}`);
    
    if (!response.ok) {
      throw new Error('Failed to get statistics');
    }
    
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error getting statistics:', error);
    return { success: false, error: error.message };
  }
};
