import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const domains = [
  "Frontend Development",
  "Backend Development",
  "MERN Stack",
  "Python Development",
  "Data Science",
  "Artificial Intelligence",
  "UI/UX Design"
];

function Recipes() {

  const [internships, setInternships] = useState([]);
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("");
  const [location, setLocation] = useState("");

  const loadInternships = () => {
    const query = new URLSearchParams();
    if (search) query.append("search", search);
    if (domain) query.append("domain", domain);
    if (location) query.append("location", location);

    fetch(`http://localhost:5000/api/internships?${query.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        setInternships(data);
      });
  };

  useEffect(() => {
    loadInternships();
  }, []);

  return (

    <div>
      <div style={{ marginBottom: "25px", textAlign: "left" }}>
        <h2>Find Internships</h2>

        <form onSubmit={(event) => { event.preventDefault(); loadInternships(); }} style={{ display: "grid", gap: "12px", maxWidth: "720px", margin: "auto" }}>
          <div>
            <label>Search internships</label>
            <br />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by company, role, skills..."
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
            <div>
              <label>Domain</label>
              <br />
              <select value={domain} onChange={(e) => setDomain(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}>
                <option value="">All Domains</option>
                {domains.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Location</label>
              <br />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or remote"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
              />
            </div>
          </div>

          <button type="submit">Search Internships</button>
        </form>
      </div>

      <div className="recipes-grid">
        {internships.map((item) => (
          <div className="recipe-card" key={item._id}>
            <img
              src="https://via.placeholder.com/600x400?text=Internship+Opportunity"
              alt={item.role}
            />
            <h2>{item.role}</h2>
            <p><strong>{item.companyName}</strong></p>
            <p>{item.domain} · {item.location}</p>
            <p>{item.duration} · {item.stipend}</p>
            <Link to={`/internship/${item._id}`}>
              <button>
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>

    </div>

  );
}

export default Recipes;