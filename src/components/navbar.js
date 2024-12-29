import React, { useState } from "react";
import { Link } from "gatsby";
import "./navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setTimeout(() => {
      setMenuOpen(false);
    }, 100); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Srivishnu</div>

      <div className="burger-icon" onClick={toggleMenu}>
        {menuOpen ? "✖" : "☰"} 
      </div>

      <ul className={`navbar-links ${menuOpen ? "mobile-menu" : ""}`}>
        <li>
          <Link to="/" activeClassName="active-link" onClick={closeMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" activeClassName="active-link" onClick={closeMenu}>
            About
          </Link>
        </li>
        <li>
          <Link to="/projects" activeClassName="active-link" onClick={closeMenu}>
            Projects
          </Link>
        </li>
        <li>
          <Link to="/resume" activeClassName="active-link" onClick={closeMenu}>
            Resume
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
