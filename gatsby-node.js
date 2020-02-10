const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
require("dotenv").config();

const Trello = require("trello");
const trello = new Trello(
  process.env.TRELLO_APPLICATION_KEY,
  process.env.TRELLO_USER_TOKEN
);

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const talkPage = path.resolve("./src/templates/talk.js");
  const talks = await trello.getCardsForList(process.env.TRELLO_LIST_ID);

  const customFields = await trello.getCustomFieldsOnBoard(
    process.env.TRELLO_BOARD_ID
  );
  console.log(customFields);

  talks.forEach((talk, index) => {
    const lines = talk.desc.split("\n");
    const cardContent = {};
    lines.forEach(line => {
      const keyValue = line.split("=");
      if (keyValue[0] && keyValue[1]) {
        cardContent[keyValue[0]] = keyValue[1];
      }
    });
    createPage({
      path: `/${index}`,
      component: talkPage,
      context: cardContent,
    });
  });
};
