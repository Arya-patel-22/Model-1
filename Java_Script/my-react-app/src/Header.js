import './App.css';

function Header(props) {
  return (
    <header className="App-header">

      <h1>Welcome to my React App</h1>

      <nav>

        <button onClick={() => props.setPage("home")}>
          Home
        </button>

        <button onClick={() => props.setPage("about")}>
          About
        </button>

      </nav>

    </header>
  );
}

function Greet(props) {
  return (
    <h1>Hello {props.name}</h1>
  );
}

export { Greet };
export default Header;