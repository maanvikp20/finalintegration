import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignUp = () => {
  const navigate = useNavigate?.() ?? (() => {});
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [serverSuccess, setServerSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!fullName.trim()) e.fullName = 'Full name is required.';
    if (!email.trim()) e.email = 'Email is required.';
    else if (!emailRegex.test(email)) e.email = 'Enter a valid email address.';
    if (password.length < 8) e.password = 'Password must be at least 8 characters.';
    if (confirm !== password) e.confirm = 'Passwords do not match.';
    if (!agree) e.agree = 'You must agree to the terms.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setServerError('');
    setServerSuccess('');
    
    if (!validate()) return;
    
    setLoading(true);
    
    // Use localhost:5000 explicitly
    const API_URL = 'http://localhost:5000';
    
    try {
      console.log('Attempting signup to:', `${API_URL}/api/auth/signup`);
      
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: fullName.trim(), 
          email: email.trim(), 
          password 
        }),
      });

      console.log('Response status:', res.status);
      
      const data = await res.json();
      console.log('Response data:', data);
      
      if (!res.ok) {
        setServerError(data?.message || 'Sign up failed.');
      } else {
        setServerSuccess('Account created successfully! Redirecting...');
        
        // Store token if provided
        if (data.data?.token) {
          localStorage.setItem('authToken', data.data.token);
        }
        
        setTimeout(() => navigate('/login'), 1200);
      }
    } catch (err) {
      console.error('Signup error:', err);
      setServerError(`Network error: ${err.message}. Make sure backend is running on port 5000.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <div className="signup-header">
          <h2>Create your account</h2>
          <p>Sign up to get started with your free account.</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          {serverError && <div className="error" role="alert">{serverError}</div>}
          {serverSuccess && <div className="success">{serverSuccess}</div>}

          <label>
            Full name
            <input
              id="name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jane Doe"
              autoComplete="name"
              disabled={loading}
            />
            {errors.fullName && <div className="field-error">{errors.fullName}</div>}
          </label>

          <label>
            Email
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              inputMode="email"
              disabled={loading}
            />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </label>

          <div className="form-row">
            <div className="form-half">
              <label>
                Password
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  disabled={loading}
                />
                {errors.password && <div className="field-error">{errors.password}</div>}
              </label>
            </div>

            <div className="form-half">
              <label>
                Confirm password
                <input
                  id="confirm"
                  type={showPassword ? 'text' : 'password'}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repeat password"
                  autoComplete="new-password"
                  disabled={loading}
                />
                {errors.confirm && <div className="field-error">{errors.confirm}</div>}
              </label>
            </div>
          </div>

          <div className="password-toggle">
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="toggle-btn"
              disabled={loading}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
            <span className="password-hint">
              Password must be at least 8 characters
            </span>
          </div>

          <label className="agree">
            <input
              id="agree"
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              disabled={loading}
            />
            I agree to the <a href="/terms">terms</a> and <a href="/privacy">privacy policy</a>
          </label>
          {errors.agree && <div className="field-error">{errors.agree}</div>}

          <button type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>

          <div className="auth-links">
            Already have an account? <a href="/login">Sign in</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;