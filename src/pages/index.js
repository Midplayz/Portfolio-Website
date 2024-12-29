import React from "react";
import { Link } from "gatsby"; 
import Layout from "../components/Layout";
import "./styles.css";

const HomePage = () => (
    <div className="homepage">
      {/* Hero Section */}
      <main className="hero-section">
        <h1 className="hero-title">Turning Ideas Into Reality</h1>
        <p className="hero-subtitle">
          Creative Developer. Passionate Innovator. Problem Solver.
        </p>
        <div className="cta-container">
          <Link to="/projects" className="cta-button">
            View My Work
          </Link>
          <Link to="/about" className="cta-outline-button">
            About Me
          </Link>
        </div>
      </main>

      {/* Quick Links Section */}
      <section className="quick-links">
        <h2>Explore</h2>
        <div className="quick-links-container">
          <div className="quick-link">
            <h3>Projects</h3>
            <p>See what I've been working on.</p>
          </div>
          <div className="quick-link">
            <h3>Blog</h3>
            <p>Read about my journey and ideas.</p>
          </div>
          <div className="quick-link">
            <h3>Contact</h3>
            <p>Get in touch with me.</p>
          </div>
        </div>
      </section>
    </div>
);

export default HomePage;
