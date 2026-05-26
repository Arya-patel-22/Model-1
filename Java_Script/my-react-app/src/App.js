import './App.css';
import Header, { Greet } from './Header';
import Footer from './Footer';
import Counter from './Counter';
import About from './About';
import Signup from "./SignUp";
import { useState } from 'react';
import Recipes from './recipes';

function App() {

  const [name, setName] = useState("");
  const [page, setPage] = useState("home");
  const [showRecipes, setShowRecipes] = useState(false);

  return (
    <div className="App">

      <Header setPage={setPage} />

      <main className="main-content">

        {page === "home" && (
          <div>

            <h1>Arya from SOU</h1>

            <Greet name="Arya" />

            <Counter />

            <button onClick={() => setShowRecipes(true)}>
              Get Recipes
            </button>

            {showRecipes && <Recipes />}

            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />

            <h1>Welcome {name}</h1>

            {/* Signup Component */}
            <Signup />

          </div>
        )}

        {page === "about" && (
          <About />
        )}

      </main>

      <Footer />

    </div>
  );
}

export default App;