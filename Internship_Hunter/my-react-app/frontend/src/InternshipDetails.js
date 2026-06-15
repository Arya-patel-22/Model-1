import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetails.css';

function InternshipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInternshipDetails();
  }, [id]);

  const fetchInternshipDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/internships/${id}`);
      setInternship(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching internship details:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading internship details...</div>;
  }

  if (!internship) {
    return <div className="not-found">Internship not found</div>;
  }

  return (
    <div className="recipe-details-container">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Internships
      </button>

      <div className="recipe-details-content">
        <div className="recipe-details-header">
          <h1>{internship.companyName}</h1>
          <h2>{internship.role}</h2>
        </div>

        <div className="recipe-details-info">
          <div className="info-section">
            <h3>Domain</h3>
            <p>{internship.domain}</p>
          </div>

          <div className="info-section">
            <h3>Location</h3>
            <p>📍 {internship.location}</p>
          </div>

          <div className="info-section">
            <h3>Duration</h3>
            <p>⏱ {internship.duration}</p>
          </div>

          <div className="info-section">
            <h3>Stipend</h3>
            <p>💰 {internship.stipend}</p>
          </div>
        </div>

        {internship.description && (
          <div className="recipe-details-description">
            <h3>About This Internship</h3>
            <p>{internship.description}</p>
          </div>
        )}

        {internship.requiredSkills && internship.requiredSkills.length > 0 && (
          <div className="recipe-details-ingredients">
            <h3>Required Skills</h3>
            <ul>
              {internship.requiredSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="recipe-details-actions">
          <a
            href={internship.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="apply-button"
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default InternshipDetails;
