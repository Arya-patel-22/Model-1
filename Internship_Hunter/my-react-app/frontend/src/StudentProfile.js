import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

function StudentProfile() {
  const navigate = useNavigate();
  const studentId = localStorage.getItem('studentId');

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    collegeName: '',
    skills: [],
    preferredDomain: '',
    preferredLocation: '',
    resumeLink: '',
  });

  const [skillInput, setSkillInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const domains = [
    'Frontend Development',
    'Backend Development',
    'MERN Stack',
    'Python Development',
    'Data Science',
    'Artificial Intelligence',
    'UI/UX Design',
  ];

  useEffect(() => {
    if (!studentId) {
      navigate('/login');
      return;
    }
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/auth/profile/${studentId}`
      );
      setProfile(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !profile.skills.includes(skillInput.trim())) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const updateData = {
        skills: profile.skills,
        preferredDomain: profile.preferredDomain,
        preferredLocation: profile.preferredLocation,
        resumeLink: profile.resumeLink,
      };

      await axios.put(
        `http://localhost:5000/api/auth/profile/${studentId}`,
        updateData
      );

      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating profile. Please try again.');
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('studentId');
    localStorage.removeItem('studentEmail');
    localStorage.removeItem('studentName');
    navigate('/login');
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {message && <div className="message">{message}</div>}

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-section">
          <h2>Personal Information</h2>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              disabled
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              disabled
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="collegeName">College Name</label>
            <input
              type="text"
              id="collegeName"
              name="collegeName"
              value={profile.collegeName}
              disabled
              className="form-input"
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Career Preferences</h2>

          <div className="form-group">
            <label htmlFor="preferredDomain">Preferred Domain</label>
            <select
              id="preferredDomain"
              name="preferredDomain"
              value={profile.preferredDomain}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Select a domain</option>
              {domains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="preferredLocation">Preferred Location</label>
            <input
              type="text"
              id="preferredLocation"
              name="preferredLocation"
              value={profile.preferredLocation}
              onChange={handleInputChange}
              placeholder="e.g., Bangalore, Remote, Mumbai"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="resumeLink">Resume Link</label>
            <input
              type="url"
              id="resumeLink"
              name="resumeLink"
              value={profile.resumeLink}
              onChange={handleInputChange}
              placeholder="https://..."
              className="form-input"
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Skills</h2>
          <div className="skills-input">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill();
                }
              }}
              placeholder="Add a skill and press Enter or click Add"
              className="form-input"
            />
            <button type="button" onClick={addSkill} className="add-skill-button">
              Add Skill
            </button>
          </div>

          <div className="skills-list">
            {profile.skills.map((skill, index) => (
              <div key={index} className="skill-tag">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="remove-skill"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" disabled={saving} className="save-button">
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}

export default StudentProfile;
