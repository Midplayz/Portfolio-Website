import React from "react";
import Layout from "../components/layout";
import "./styles.css";

const HomePage = () => (
  <Layout>
    <div className="homepage">
      {/* Main Content */}
      <main className="hero-section">
        <h1 className="hero-title">Welcome to My Portfolio</h1>
        <p className="hero-subtitle">Explore my projects and experiences below.</p>
        <button className="cta-button">Get Started</button>
      </main>
    </div>
  </Layout>
);

export default HomePage;
