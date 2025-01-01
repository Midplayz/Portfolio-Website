import React from "react";
import { Link } from "gatsby";
import Seo from "../components/seo";
import "./404.css";

const NotFoundPage = () => (
    <div className="not-found-page">
      <div className="error-container">
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>
          The page you're looking for doesn't exist. You might have mistyped
          the URL or the page has been moved.
        </p>
        <Link to="/" className="go-home-button">
          Go Back Home
        </Link>
      </div>
    </div>
);

export const Head = () => <Seo title="404: Not Found" />;

export default NotFoundPage;