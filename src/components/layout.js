import React from "react";
import { motion } from "framer-motion";
import Footer from "./footer";
import Navbar from "./navbar";
import "./layout.css";

const Layout = ({ children, location }) => {
  const pageTransition = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="Layout">
      <Navbar />
      <motion.main
        key={location?.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};

export default Layout;
