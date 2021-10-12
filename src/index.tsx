import * as React from 'react';
import 'piral/polyfills';
import { renderInstance } from 'piral';
import { createAuthApi } from 'piral-auth';
import { layout, errors } from './layout';
import { getUser } from './auth';
// import { setupOidcClient, createOidcApi } from 'piral-oidc';
import { setupOAuth2Client, createOAuth2Api } from 'piral-oauth2';

// change to your feed URL here (either using feed.piral.cloud or your own service)
const feedUrl = 'https://feed.piral.cloud/api/v1/pilet/empty';

export const client = setupOAuth2Client({  
  clientId: 'YxADyiGrTg5FLEvJn2hdfMDOSaIfhZzIun_KthhTxV4',
  clientSecret: 'YxADyiGrTg5FLEvJn2hdfMDOSaIfhZzIun_KthhTxV4',
  redirectUri: 'http://localhost:1234',
  accessTokenUri: 'http://localhost:8080/token',
  authorizationUri: 'http://localhost:8080/authorize',
  scopes: [],
  flow: 'code', 
});

export const piral = renderInstance({
  layout,
  errors,
  extendApi: [
    createOAuth2Api(client),
    // createOidcApi(oidcClient),
  ],
  plugins: [createAuthApi(getUser())],
  requestPilets() {
    return fetch(feedUrl)
      .then(res => res.json())
      .then(res => res.items);
  },
});

const app = piral.root;

app.registerTile('auth-demo-login-tile', () => {
  const login = () => {
    client.login();
  };

  return (
    <div className="tile rows-1 cols-1">
      <button onClick={login}>Login</button>
    </div>
  );
});

app.registerTile('auth-demo-token-tile', () => {
  const fetchToken = () => {
    // client.login();
    client.token()
      .then((token) => app.showNotification(`Successfully fetched an access token: ${token.substr(0, 50)}...`))
      .then(() => console.log(client.account()))
      .catch((error) => app.showNotification(`Failed to fetch a token: ${error}`));
  };

  return (
    <div className="tile rows-1 cols-1">
      <button onClick={fetchToken}>Fetch Access Token</button>
    </div>
  );
});

app.registerPage('/auth', ({ piral }) => {
  console.log("Piral : ", piral)
  return(
    <> auth {document.URL} </>
  )
});