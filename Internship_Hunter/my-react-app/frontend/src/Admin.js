import React, { useEffect, useState } from "react";

const initialForm = {
  companyName: "",
  role: "",
  domain: "",
  requiredSkills: "",
  location: "",
  stipend: "",
  duration: "",
  applyLink: ""
};

function Admin() {
  const [internships, setInternships] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  const fetchInternships = async () => {
    const response = await fetch("http://localhost:5000/api/internships");
    const data = await response.json();
    setInternships(data || []);
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const payload = {
      ...formData,
      requiredSkills: formData.requiredSkills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
    };

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:5000/api/internships/${editId}`
      : "http://localhost:5000/api/internships";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.ok) {
      setMessage(data.message || "Internship saved successfully.");
      setFormData(initialForm);
      setEditId(null);
      fetchInternships();
    } else {
      setMessage(data.message || "Unable to save internship.");
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setFormData({
      companyName: item.companyName,
      role: item.role,
      domain: item.domain,
      requiredSkills: item.requiredSkills.join(", "),
      location: item.location,
      stipend: item.stipend,
      duration: item.duration,
      applyLink: item.applyLink
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/internships/${id}`, {
      method: "DELETE"
    });
    fetchInternships();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Manage internship opportunities and keep the platform up to date.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name:</label>
          <br />
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Role:</label>
          <br />
          <input type="text" name="role" value={formData.role} onChange={handleChange} />
        </div>

        <div>
          <label>Domain:</label>
          <br />
          <input type="text" name="domain" value={formData.domain} onChange={handleChange} />
        </div>

        <div>
          <label>Required Skills (comma separated):</label>
          <br />
          <input
            type="text"
            name="requiredSkills"
            value={formData.requiredSkills}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Location:</label>
          <br />
          <input type="text" name="location" value={formData.location} onChange={handleChange} />
        </div>

        <div>
          <label>Stipend:</label>
          <br />
          <input type="text" name="stipend" value={formData.stipend} onChange={handleChange} />
        </div>

        <div>
          <label>Duration:</label>
          <br />
          <input type="text" name="duration" value={formData.duration} onChange={handleChange} />
        </div>

        <div>
          <label>Apply Link:</label>
          <br />
          <input type="text" name="applyLink" value={formData.applyLink} onChange={handleChange} />
        </div>

        <button type="submit">{editId ? "Update Internship" : "Add Internship"}</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}

      <div className="recipes-grid" style={{ marginTop: "30px" }}>
        {internships.map((item) => (
          <div className="recipe-card" key={item._id}>
            <h3>{item.role}</h3>
            <p><strong>{item.companyName}</strong></p>
            <p>{item.domain} · {item.location}</p>
            <p>{item.duration} · {item.stipend}</p>
            <p>{item.requiredSkills.join(", ")}</p>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)} style={{ marginLeft: "10px" }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
