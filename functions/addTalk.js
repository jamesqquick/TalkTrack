require("dotenv").config();
const Trello = require("trello");
const trello = new Trello(
  process.env.TRELLO_APPLICATION_KEY,
  process.env.TRELLO_USER_TOKEN
);
const axios = require("axios");

exports.handler = async function(event, context, callback) {
  const body = JSON.parse(event.body);
  const { title, date, slides, conference, description, hashtag } = body;
  const header = `${title}-${conference}`;
  const cardContent = `title=${title}
conference=${conference}
slides=${slides}
hashtag=${hashtag}
date=${date}
description=${description}`;

  try {
    const card = await trello.addCard(
      header,
      cardContent,
      process.env.TRELLO_LIST_ID
    );
    const res = await axios.post(process.env.NETLIFY_BUILD_HOOK);
    if (res.status !== 200) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: "Failed to trigger build." }),
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
      body: JSON.stringify({ msg: "Failed to send email." }),
    };
  }
};
