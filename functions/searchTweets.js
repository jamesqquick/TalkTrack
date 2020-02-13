require("dotenv").config();
const Twitter = require("twitter");

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN,
});

exports.handler = async (event, context) => {
  // Only allow GET
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const hashtag = event.queryStringParameters.hashtag;

  try {
    const res = await client.get("search/tweets", { q: hashtag });
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: `Success`, tweets: res.statuses }),
    };
  } catch (ex) {
    console.error(ex);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: `Failed to search tweets` }),
    };
  }
};
