import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RecipeDetails() {

  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {

    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((response) => response.json())
      .then((data) => {

        setRecipe(data);

      });

  }, [id]);

  if (!recipe) {
    return <h1>Loading...</h1>;
  }

  return (

    <div className="recipe-details">

      <img
        src={recipe.image}
        alt={recipe.name}
      />

      <h1>{recipe.name}</h1>

      <h2>Ingredients</h2>

      <ul>

        {recipe.ingredients.map((item, index) => (

          <li key={index}>{item}</li>

        ))}

      </ul>

      <h2>Instructions</h2>

      <p>{recipe.instructions}</p>

    </div>

  );
}

export default RecipeDetails;