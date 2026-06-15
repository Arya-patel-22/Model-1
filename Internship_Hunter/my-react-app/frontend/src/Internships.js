import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Recipes.css';

function Internships() {
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [loading, setLoading] = useState(true);

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
      setFilteredInternships(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching internships:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = internships;

    if (searchTerm) {
      filtered = filtered.filter(
        (internship) =>
          internship.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          internship.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDomain) {
      filtered = filtered.filter((internship) => internship.domain === selectedDomain);
    }

    if (selectedLocation) {
      filtered = filtered.filter((internship) =>
        internship.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    setFilteredInternships(filtered);
  }, [searchTerm, selectedDomain, selectedLocation, internships]);

  return (
    <div className="recipes-container">
      <div className="search-section">
        <h1>Discover Internship Opportunities</h1>
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search by company or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters">
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="filter-select"
          >
            <option value="">All Domains</option>
            {domains.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Filter by location..."
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="filter-input"
          />
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading internships...</div>
      ) : filteredInternships.length > 0 ? (
        <div className="recipes-grid">
          {filteredInternships.map((internship) => (
            <Link
              to={`/internship/${internship._id}`}
              key={internship._id}
              className="recipe-card"
            >
              <div className="recipe-header">
                <h2>{internship.companyName}</h2>
              </div>
              <div className="recipe-info">
                <div className="recipe-meta">
                  <span className="role">
                    <strong>Role:</strong> {internship.role}
                  </span>
                  <span className="domain">
                    <strong>Domain:</strong> {internship.domain}
                  </span>
                </div>
              </div>
              <div className="recipe-footer">
                <p className="location">📍 {internship.location}</p>
                <p className="duration">⏱ {internship.duration}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No internships found. Try adjusting your filters!</p>
        </div>
      )}
    </div>
  );
}

export default Internships;
