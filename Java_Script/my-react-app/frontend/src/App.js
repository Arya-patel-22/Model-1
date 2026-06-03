import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './Header';
import Footer from './Footer';

import Signup from './SignUp';
import Recipes from './Recipes';
import RecipeDetails from './RecipeDetails';
import About from './About';

function App() {

  return (

    <BrowserRouter>

      <div className="App">

        <Header />

        <main className="main-content">

          <Routes>

            <Route
              path="/"
              element={<Recipes />}
            />

            <Route
              path="/recipe/:id"
              element={<RecipeDetails />}
            />

            <Route
              path="/signup"
              element={<Signup />}
            />

            <Route
              path="/about"
              element={<About />}
            />

          </Routes>

        </main>

        <Footer />

      </div>

    </BrowserRouter>

  );
}

export default App;