import './App.css';

import { Link } from "react-router-dom";

function Header() {

  return (

    <header className="App-header">

      <h1>Internship Hunter Platform</h1>

      <nav>

        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/admin">Admin</Link>

      </nav>

    </header>

  );
}

export default Header;