/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

import React from "react";
import { AnimatePresence } from "framer-motion";
import Layout from "./src/components/layout";

export const wrapPageElement = ({ element, props }) => (
  <AnimatePresence mode="wait" initial={false}>
    <Layout {...props}>{element}</Layout>
  </AnimatePresence>
);
