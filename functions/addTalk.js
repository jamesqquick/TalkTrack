require('dotenv').config();
const Trello = require('trello');
const trello = new Trello(
  process.env.TRELLO_APPLICATION_KEY,
  process.env.TRELLO_USER_TOKEN
);
const axios = require('axios');
const { requirePermission } = require('./utils/auth');

exports.handler = requirePermission('add:talk', async function(event) {
  const body = JSON.parse(event.body);
  const { title, date, slides, conference, description } = body;
  const header = `${title}-${conference}`;
  const cardContent = `title=${title}
conference=${conference}
slides=${slides}
date=${date}
description=${description}`;

  try {
    await trello.addCard(header, cardContent, process.env.TRELLO_LIST_ID);
    const res = await axios.post(process.env.NETLIFY_BUILD_HOOK);
    if (res.status !== 200) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: 'Failed to trigger build.' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: body }),
    };
  } catch (ex) {
    console.error(ex);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: 'Failed to add talk.' }),
    };
  }
});
