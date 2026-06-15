import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    collegeName: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
      console.log('Signup successful:', response.data);

      // Store studentId in localStorage
      localStorage.setItem('studentId', response.data.studentId);
      localStorage.setItem('studentEmail', formData.email);

      // Redirect to profile completion page
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>Create Your Profile</h1>
        <p className="subtitle">Join Internship Hunter Platform</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="collegeName">College Name *</label>
            <input
              type="text"
              id="collegeName"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleChange}
              required
              placeholder="Enter your college name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a strong password"
              className="form-input"
            />
          </div>

          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
