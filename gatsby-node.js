const path = require("path");

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const gameTemplate = path.resolve("src/templates/GameInfoTemplate.js");

  const gamesData = require("./src/data/projects.json");
  const othersData = require("./src/data/others.json");

  const allProjects = [...gamesData, ...othersData];

  allProjects.forEach((project) => {
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
