import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

import { navigate } from 'gatsby';
import authConfig from './auth_config.json';

const onRedirectCallback = appState => navigate(appState?.returnTo || '/');

export const wrapRootElement = ({ element }) => {
  return (
    <Auth0Provider
      domain={authConfig.domain}
      clientId={authConfig.clientId}
      audience={authConfig.audience}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {element}
    </Auth0Provider>
  );
};
