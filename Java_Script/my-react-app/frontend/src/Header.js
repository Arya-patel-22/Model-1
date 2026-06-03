import './App.css';

import { Link } from "react-router-dom";

function Header() {

  return (

    <header className="App-header">

      <h1>Welcome to my React App</h1>

      <nav>

        <Link to="/">
          Home
        </Link>

        <Link to="/about">
          About
        </Link>

        <Link to="/signup">
          Signup
        </Link>

      </nav>

    </header>

  );
}

export default Header;