const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
require('dotenv').config();

const Trello = require('trello');
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
  const talkPage = path.resolve('./src/templates/talk.js');
  const talks = await trello.getCardsForList(process.env.TRELLO_LIST_ID);

  const formattedTalks = talks.map(talk => {
    const lines = talk.desc.split('\n');
    const cardContent = {};
    lines.forEach(line => {
      const keyValue = line.split('=');
      if (keyValue[0] && keyValue[1]) {
        cardContent[keyValue[0]] = keyValue[1];
      }
    });
    cardContent['slug'] =
      '/talk/' +
      (cardContent.title + ' ' + cardContent.conference).replace(/ /g, '-');
    cardContent['id'] = talk.id;
    cardContent['excerpt'] = cardContent.description
      .split(' ')
      .splice(0, 30)
      .join(' ');

    if (cardContent.description.split(' ').length > 50) {
      cardContent['excerpt'] += '...';
    }
    return cardContent;
  });
  formattedTalks.forEach((talk, index) => {
    createPage({
      path: `${talk.slug}`,
      component: talkPage,
      context: talk,
    });
  });

  const indexPage = path.resolve('./src/templates/index.js');
  createPage({
    path: '/',
    component: indexPage,
    context: { talks: formattedTalks },
  });
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    /*
     * During the build step, `auth0-js` will break because it relies on
     * browser-specific APIs. Fortunately, we don’t need it during the build.
     * Using Webpack’s null loader, we’re able to effectively ignore `auth0-js`
     * during the build. (See `src/utils/auth.js` to see how we prevent this
     * from breaking the app.)
     */
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /auth0-js/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
