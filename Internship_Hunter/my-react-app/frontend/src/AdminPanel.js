import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

function AdminPanel() {
  const [internships, setInternships] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    domain: 'Frontend Development',
    requiredSkills: '',
    location: '',
    stipend: '',
    duration: '',
    applyLink: '',
    description: '',
    companyLogo: '',
  });

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
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/internships');
      setInternships(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching internships:', error);
      setMessage('Error fetching internships');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      companyName: '',
      role: '',
      domain: 'Frontend Development',
      requiredSkills: '',
      location: '',
      stipend: '',
      duration: '',
      applyLink: '',
      description: '',
      companyLogo: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const submitData = {
        ...formData,
        requiredSkills: formData.requiredSkills
          .split(',')
          .map((skill) => skill.trim())
          .filter((skill) => skill),
      };

      if (editingId) {
        // Update existing internship
        await axios.put(
          `http://localhost:5000/api/internships/${editingId}`,
          submitData
        );
        setMessage('Internship updated successfully!');
      } else {
        // Create new internship
        await axios.post('http://localhost:5000/api/internships', submitData);
        setMessage('Internship created successfully!');
      }

      fetchInternships();
      resetForm();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving internship. Please try again.');
      console.error('Error:', error);
    }
  };

  const handleEdit = (internship) => {
    setFormData({
      ...internship,
      requiredSkills: internship.requiredSkills.join(', '),
    });
    setEditingId(internship._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this internship?')) {
      try {
        await axios.delete(`http://localhost:5000/api/internships/${id}`);
        setMessage('Internship deleted successfully!');
        fetchInternships();
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Error deleting internship.');
        console.error('Error:', error);
      }
    }
  };

  if (loading) {
    return <div className="admin-container"><p>Loading...</p></div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Panel - Internship Management</h1>
        <button
          className="add-button"
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setShowForm(true);
            }
          }}
        >
          {showForm ? 'Cancel' : '+ Add New Internship'}
        </button>
      </div>

      {message && <div className="message">{message}</div>}

      {showForm && (
        <div className="admin-form-section">
          <h2>{editingId ? 'Edit Internship' : 'Create New Internship'}</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label>Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Role *</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Domain *</label>
                <select
                  name="domain"
                  value={formData.domain}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  {domains.map((domain) => (
                    <option key={domain} value={domain}>
                      {domain}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Duration *</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., 3 months, 6 months"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Stipend</label>
                <input
                  type="text"
                  name="stipend"
                  value={formData.stipend}
                  onChange={handleInputChange}
                  placeholder="e.g., ₹15,000/month"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Required Skills (comma-separated)</label>
              <input
                type="text"
                name="requiredSkills"
                value={formData.requiredSkills}
                onChange={handleInputChange}
                placeholder="e.g., React, JavaScript, CSS"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Apply Link *</label>
              <input
                type="url"
                name="applyLink"
                value={formData.applyLink}
                onChange={handleInputChange}
                required
                placeholder="https://..."
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter internship description"
                className="form-textarea"
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Company Logo URL</label>
              <input
                type="url"
                name="companyLogo"
                value={formData.companyLogo}
                onChange={handleInputChange}
                placeholder="https://..."
                className="form-input"
              />
            </div>

            <button type="submit" className="submit-button">
              {editingId ? 'Update Internship' : 'Create Internship'}
            </button>
          </form>
        </div>
      )}

      <div className="internships-table">
        <h2>All Internships ({internships.length})</h2>
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Domain</th>
              <th>Location</th>
              <th>Duration</th>
              <th>Stipend</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {internships.map((internship) => (
              <tr key={internship._id}>
                <td>{internship.companyName}</td>
                <td>{internship.role}</td>
                <td>{internship.domain}</td>
                <td>{internship.location}</td>
                <td>{internship.duration}</td>
                <td>{internship.stipend}</td>
                <td className="actions">
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(internship)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(internship._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;
