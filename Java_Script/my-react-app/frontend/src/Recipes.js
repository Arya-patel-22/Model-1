import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Recipes() {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {

    fetch("https://dummyjson.com/recipes")
      .then((response) => response.json())
      .then((data) => {

        setRecipes(data.recipes);

      });

  }, []);

  return (

    <div className="recipes-grid">

      {recipes.map((item) => (

        <div className="recipe-card" key={item.id}>

          <img
            src={item.image}
            alt={item.name}
          />

          <h2>{item.name}</h2>

          <Link to={`/recipe/${item.id}`}>

            <button>
              Get Recipe
            </button>

          </Link>

        </div>

      ))}

    </div>

  );
}

export default Recipes;