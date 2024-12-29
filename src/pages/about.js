import React from "react";
import Layout from "../components/Layout";
import "./about.css";

const AboutPage = () => (
    <div className="about-page">
      {/* Header Section */}
      <section className="header-section">
        <h1 className="header-title">About Me</h1>
        <p className="header-description">
          Passionate Game Developer aspiring to be a Software Generalist. <br />
          Turning dreams into reality, one project at a time.
        </p>
      </section>

      {/* About Section */}
      <section className="about-section alt-bg">
        <div className="about-content">
          <h2>Who Am I?</h2>
          <p>
            My name is <span className="highlight">Srivishnu Srinivasan</span>.
            I’m a <span className="highlight">22-year-old game developer </span>
            who has loved gaming since childhood. My fascination with the
            <span className="highlight"> engineering behind games</span> led me
            to pursue <span className="highlight">Game Design and Development</span>.
            Coding is not just work to me — it’s a thrilling challenge and creative outlet.
            I enjoy playing various genres like <span className="highlight">FPS</span>,
            <span className="highlight"> Parkour</span>, and more.
          </p>
        </div>
        <div className="about-stats">
          <div className="stat">
            <h3>1.5+</h3>
            <p>Years of Experience</p>
          </div>
          <div className="stat">
            <h3>10+</h3>
            <p>Completed Projects</p>
          </div>
          <div className="stat">
            <h3>100+</h3>
            <p>Games Played</p>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="goals-section">
        <h2>My Goals</h2>
        <ul className="goals-list">
          <li className="goal-item">Develop games that express unique ideas and creativity.</li>
          <li className="goal-item">Introduce revolutionary concepts into the gaming industry.</li>
          <li className="goal-item">Create experiences that resonate with players worldwide.</li>
          <li className="goal-item">Be part of a passionate game development team.</li>
          <li className="goal-item">Work alongside well-known developers.</li>
          <li className="goal-item">Complete and enjoy all popular gaming titles.</li>
        </ul>
      </section>

      {/* Vision Section */}
      <section className="vision-section alt-bg">
        <h2>My Vision</h2>
        <p>
          My vision is to bring <span className="highlight">revolutionary concepts </span>
          to the gaming industry. I aim to innovate, create, and inspire by contributing
          to the evolution of game design and development. Being part of this industry
          is a dream come true, and I’m determined to leave a mark.
        </p>
      </section>
    </div>
);

export default AboutPage;
