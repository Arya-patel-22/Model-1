import React, { useEffect, useState } from "react";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    collegeName: "",
    skills: "",
    preferredDomain: "",
    preferredLocation: "",
    resumeLink: ""
  });
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("internship_hunter_token");

  useEffect(() => {
    if (!token) {
      setProfile(null);
      return;
    }

    fetch("http://localhost:5000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setProfile(null);
          return;
        }

        setProfile(data);
        setFormData({
          collegeName: data.collegeName || "",
          skills: data.skills ? data.skills.join(", ") : "",
          preferredDomain: data.preferredDomain || "",
          preferredLocation: data.preferredLocation || "",
          resumeLink: data.resumeLink || ""
        });
      });
  }, [token]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setMessage("");

    const payload = {
      ...formData,
      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
    };

    const response = await fetch("http://localhost:5000/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.ok) {
      setMessage(data.message || "Profile updated successfully.");
      localStorage.setItem("internship_hunter_user", JSON.stringify(data.user));
      setProfile(data.user);
    } else {
      setMessage(data.message || "Unable to update profile.");
    }
  };

  if (!token) {
    return <h2>Please login to view your profile.</h2>;
  }

  if (!profile) {
    return <h2>Loading profile...</h2>;
  }

  return (
    <div>
      <h2>{profile.name}'s Profile</h2>

      <p>
        <strong>Email:</strong> {profile.email}
      </p>
      <p>
        <strong>College:</strong> {profile.collegeName || "Not set"}
      </p>
      <p>
        <strong>Preferred Domain:</strong> {profile.preferredDomain || "Not set"}
      </p>
      <p>
        <strong>Preferred Location:</strong> {profile.preferredLocation || "Not set"}
      </p>
      <p>
        <strong>Skills:</strong> {(profile.skills || []).join(", ") || "Not set"}
      </p>
      <p>
        <strong>Resume:</strong>{" "}
        {profile.resumeLink ? (
          <a href={profile.resumeLink} target="_blank" rel="noreferrer">
            View Resume
          </a>
        ) : (
          "Not provided"
        )}
      </p>

      <h3>Update Profile</h3>

      <form onSubmit={handleUpdate}>
        <div>
          <label>College Name:</label>
          <br />
          <input
            type="text"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Skills (comma separated):</label>
          <br />
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Preferred Domain:</label>
          <br />
          <input
            type="text"
            name="preferredDomain"
            value={formData.preferredDomain}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Preferred Location:</label>
          <br />
          <input
            type="text"
            name="preferredLocation"
            value={formData.preferredLocation}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Resume Link:</label>
          <br />
          <input
            type="text"
            name="resumeLink"
            value={formData.resumeLink}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Update Profile</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
}

export default Profile;
