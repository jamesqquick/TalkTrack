import React from 'react';
import { Auth0Provider } from './src/utils/auth';
import { navigate } from 'gatsby';

// A function that routes the user to the right place after login
const onRedirectCallback = appState => {
  // TODO: What about history and targetURL?
  navigate(appState);
};

export const wrapRootElement = ({ element }) => {
  return (
    <Auth0Provider
      domain={process.env.AUTH0_DOMAIN}
      client_id={process.env.AUTH0_CLIENT_ID}
      audience={process.env.AUTH0_AUDIENCE}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {element}
    </Auth0Provider>
  );
};
