const path = require("path");

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const gameTemplate = path.resolve("src/templates/GameInfoTemplate.js");

  const result = await graphql(`
    {
      allProjectsJson {
        nodes {
          slug
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("Error loading project data", result.errors);
    return;
  }

  result.data.allProjectsJson.nodes.forEach((project) => {
    createPage({
      path: `/projects/${project.slug}`,
      component: gameTemplate,
      context: {
        slug: project.slug,
      },
    });
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.json$/,
          type: "json",
        },
      ],
    },
  });
};

