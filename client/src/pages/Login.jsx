import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate?.() ?? (() => {});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const validate = () => {
    if (!email) return 'Email is required';
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) return 'Invalid email address';
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      // Replace with your real login endpoint
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, remember })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || 'Login failed');
      }

      const data = await res.json();
      setSuccess('Logged in successfully! Redirecting...');
      
      // Store token if provided
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      
      // Redirect after success
      setTimeout(() => {
        navigate('/');
      }, 1200);
    } catch (err) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-header">
          <h2>Sign in</h2>
          <p>Welcome back! Please enter your details.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error" role="alert">{error}</div>}
          {success && <div className="success">{success}</div>}

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="username"
              disabled={loading}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              disabled={loading}
            />
          </label>

          <label className="remember">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              disabled={loading}
            />
            Remember me for 30 days
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <div className="auth-links">
            Don't have an account? <a href="/signup">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;