require("dotenv").config();
const Trello = require("trello");
const trello = new Trello(
  process.env.TRELLO_APPLICATION_KEY,
  process.env.TRELLO_USER_TOKEN
);

exports.handler = function(event, context, callback) {
  const body = JSON.parse(event.body);
  const { title, date, slides, conference, description, hashtag } = body;
  const header = `${title}-${conference}`;
  const cardContent = `title=${title}
conference=${conference}
slides=${slides}
hashtag=${hashtag}
date=${date}
description=${description}`;

  trello.addCard(
    header,
    cardContent,
    process.env.TRELLO_LIST_ID,
    (err, card) => {
      if (err) {
        console.log(err);
        return callback(null, {
          statusCode: 500,
          body: JSON.stringify({ msg: "Failed to send email." }),
        });
      }
      console.log(card);
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({ msg: body }),
      });
    }
  );
};
