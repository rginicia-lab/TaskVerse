import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        TaskVerse
      </div>

      <ul className="nav-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <a href="#features">Features</a>
        </li>

        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

      </ul>

      <div className="buttons">

        <Link to="/login">
          <button className="login-btn">
            Login
          </button>
        </Link>

        <Link to="/register">
          <button className="register-btn">
            Register
          </button>
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;