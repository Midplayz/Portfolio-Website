import React from "react";
import "./coming-soon.css";
import Layout from "../components/Layout";

const ComingSoonPage = () => (
  <div className="coming-soon-page">
    <div className="content">
      <h1 className="title">Coming Soon</h1>
      <p className="subtitle">Something exciting is on its way! Stay tuned.</p>
      <div className="spinner">
        <div className="circle"></div>
      </div>
    </div>
  </div>
);

export default ComingSoonPage;
