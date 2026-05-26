import { useEffect, useState } from "react";

function Recipes() {

  const [recipes, setrecipes] = useState([]);

  useEffect(() => {

    fetch("https://dummyjson.com/recipes")
      .then((response) => response.json())
      .then((data) => {

        setrecipes(data.recipes);

      });

  }, []);

return (
  <div className="recipes-container">

    <h1 className="recipes-title">Recipes</h1>

    <table className="recipe-table">

      <thead>

        <tr>
          <th>ID</th>
          <th>Recipe Name</th>
          <th>Ingredients</th>
        </tr>

      </thead>

      <tbody>

        {recipes.map((item) => (

          <tr key={item.id}>

            <td>{item.id}</td>

            <td>{item.name}</td>

            <td className="ingredients">
              {item.ingredients.join(", ")}
            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>
);

}

export default Recipes;