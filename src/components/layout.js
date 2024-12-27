import React from "react";
import Footer from "./footer";
import Navbar from "./navbar"; 
import "./layout.css"; 

const Layout = ({ children }) => (
  <div className="Layout">
    <Navbar /> 
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
