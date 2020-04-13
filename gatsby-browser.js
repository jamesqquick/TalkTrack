import React from 'react';
import { Auth0Provider } from './src/utils/auth';
import { navigate } from 'gatsby';
import authConfig from './auth_config.json';
// A function that routes the user to the right place after login
const onRedirectCallback = appState => {
  // TODO: What about history and targetURL?
  navigate(appState);
};

export const wrapRootElement = ({ element }) => {
  return (
    <Auth0Provider
      domain={authConfig.domain}
      client_id={authConfig.clientId}
      audience={authConfig.audience}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {element}
    </Auth0Provider>
  );
};
