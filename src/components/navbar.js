import React, { useState } from "react";
import { Link } from "gatsby";
import "./navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Srivishnu</div>

      <div className="burger-icon" onClick={toggleMenu}>
        {menuOpen ? "✖" : "☰"} 
      </div>

      <ul className={`navbar-links ${menuOpen ? "mobile-menu" : ""}`}>
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
};

export default Navbar;