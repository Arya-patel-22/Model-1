import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RecipeDetails() {

  const { id } = useParams();

  const [internship, setInternship] = useState(null);

  useEffect(() => {

    fetch(`http://localhost:5000/api/internships/${id}`)
      .then((response) => response.json())
      .then((data) => {

        setInternship(data);

      });

  }, [id]);

  if (!internship) {
    return <h1>Loading...</h1>;
  }

  return (

    <div className="recipe-details">

      <img
        src="https://via.placeholder.com/600x400?text=Internship+Details"
        alt={internship.role}
      />

      <h1>{internship.role}</h1>
      <p><strong>Company:</strong> {internship.companyName}</p>
      <p><strong>Domain:</strong> {internship.domain}</p>
      <p><strong>Location:</strong> {internship.location}</p>
      <p><strong>Duration:</strong> {internship.duration}</p>
      <p><strong>Stipend:</strong> {internship.stipend}</p>
      <p><strong>Required Skills:</strong> {internship.requiredSkills.join(", ")}</p>
      <p><strong>Apply Link:</strong> <a href={internship.applyLink} target="_blank" rel="noreferrer">Apply Here</a></p>

    </div>

  );
}

export default RecipeDetails;