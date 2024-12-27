import React from "react";
import { Link } from "gatsby";
import "./navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-logo">Srivishnu</div>
    <ul className="navbar-links">
      <li>
        <Link to="/" activeClassName="active-link">
          Home
        </Link>
      </li>
      <li>
        <Link to="/about" activeClassName="active-link">
          About
        </Link>
      </li>
      <li>
        <Link to="/projects" activeClassName="active-link">
          Projects
        </Link>
      </li>
      <li>
        <Link to="/resume" activeClassName="active-link">
          Resume
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;