require('dotenv').config();
const Trello = require('trello');
const trello = new Trello(
  process.env.TRELLO_APPLICATION_KEY,
  process.env.TRELLO_USER_TOKEN
);
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

exports.handler = async function(event, context, callback) {
  const body = JSON.parse(event.body);
  const { email, feedback, rating, cardId } = body;
  const comment = `${rating} | ${feedback} ${!!email ? email : ''}`;

  try {
    await trello.addCommentToCard(cardId, comment);

    if (process.env.TEXT_ALERTS_ON === 'TRUE') {
      await client.messages.create({
        body: `New Feedback : "${comment}"`,
        from: process.env.TWILIO_FROM_NUMBER,
        to: process.env.TWILIO_TO_NUMBER,
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: 'Thanks for the feedback!' }),
    };
  } catch (ex) {
    console.error(ex);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: 'Failed to save fedback.' }),
    };
  }
};
