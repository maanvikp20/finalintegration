// In-memory user database
let users = [
  {
    id: 1,
    username: 'demo',
    email: 'demo@example.com',
    password: 'password123', // In production, this would be hashed
    createdAt: new Date('2024-01-01').toISOString()
  }
];

let nextUserId = 2;

class User {
  constructor(data) {
    this.id = data.id || nextUserId++;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password; // In production, hash this
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  // Validation
  static validate(data, isLogin = false) {
    const errors = [];

    if (!data.email || data.email.trim() === '') {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push('Invalid email format');
    }

    if (!data.password || data.password.trim() === '') {
      errors.push('Password is required');
    } else if (!isLogin && data.password.length < 6) {
      errors.push('Password must be at least 6 characters');
    }

    if (!isLogin) {
      if (!data.username || data.username.trim() === '') {
        errors.push('Username is required');
      } else if (data.username.length < 3) {
        errors.push('Username must be at least 3 characters');
      }
    }

    return errors;
  }

  // Get all users
  static getAll() {
    return users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt
    }));
  }

  // Get user by ID
  static getById(id) {
    const user = users.find(user => user.id === parseInt(id));
    if (!user) return null;
    
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt
    };
  }

  // Get user by email
  static getByEmail(email) {
    return users.find(user => user.email === email);
  }

  // Get user by username
  static getByUsername(username) {
    return users.find(user => user.username === username);
  }

  // Create new user (register)
  static create(data) {
    // Check if user already exists
    if (User.getByEmail(data.email)) {
      return { error: 'Email already exists' };
    }
    
    if (User.getByUsername(data.username)) {
      return { error: 'Username already exists' };
    }

    const newUser = new User(data);
    users.push(newUser);
    
    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt
    };
  }

  // Login user
  static login(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt
    };
  }

  // Update user
  static update(id, data) {
    const index = users.findIndex(user => user.id === parseInt(id));
    if (index === -1) {
      return null;
    }

    // Check if new email/username already exists (for other users)
    if (data.email && data.email !== users[index].email) {
      const existingUser = User.getByEmail(data.email);
      if (existingUser && existingUser.id !== parseInt(id)) {
        return { error: 'Email already exists' };
      }
    }

    if (data.username && data.username !== users[index].username) {
      const existingUser = User.getByUsername(data.username);
      if (existingUser && existingUser.id !== parseInt(id)) {
        return { error: 'Username already exists' };
      }
    }

    const updatedUser = {
      ...users[index],
      username: data.username || users[index].username,
      email: data.email || users[index].email,
      password: data.password || users[index].password
    };

    users[index] = updatedUser;
    
    return {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      createdAt: updatedUser.createdAt
    };
  }

  // Delete user
  static delete(id) {
    const index = users.findIndex(user => user.id === parseInt(id));
    if (index === -1) {
      return false;
    }

    users.splice(index, 1);
    return true;
  }
}

module.exports = User;
