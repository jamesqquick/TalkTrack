require('dotenv').config();
const Trello = require('trello');
const trello = new Trello(
  process.env.TRELLO_APPLICATION_KEY,
  process.env.TRELLO_USER_TOKEN
);
const axios = require('axios');
var jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const { promisify } = require('util');

const client = jwksClient({
  cache: true, // Default Value
  cacheMaxEntries: 5, // Default value
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

let signingKey;

exports.handler = async function(event, context, callback) {
  const rawAuthorizationHeader = event.headers['authorization'];
  let user = null;
  try {
    user = await checkHeaderForValidToken(rawAuthorizationHeader);
  } catch (err) {
    return {
      statusCode: 401,
      body: JSON.stringify({ msg: err }),
    };
  }

  const body = JSON.parse(event.body);
  const { title, date, slides, conference, description } = body;
  const header = `${title}-${conference}`;
  const cardContent = `title=${title}
conference=${conference}
slides=${slides}
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
      body: JSON.stringify({ msg: 'Failed to send email.' }),
    };
  }
};

const checkHeaderForValidToken = async rawAuthorizationHeader => {
  if (!rawAuthorizationHeader) {
    throw 'Unauthorized. No access token included';
  }

  const accessToken = rawAuthorizationHeader.split(' ')[1];
  if (!accessToken) {
    throw 'Unauthorized. Token is invalid.';
  }

  if (!signingKey) {
    const getSigningKey = promisify(client.getSigningKey);
    try {
      const key = await getSigningKey(process.env.AUTH0_KEY_ID);
      signingKey = key.getPublicKey();
    } catch (err) {
      console.error(err);
      throw 'Failed to verify key';
    }
  }

  try {
    var decoded = jwt.verify(accessToken, signingKey);
  } catch (err) {
    console.error(err);
    throw err.message;
  }

  if (!decoded) {
    throw 'Failed to verify token';
  }
  return decoded;
};
