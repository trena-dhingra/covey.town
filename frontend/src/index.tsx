import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import reportWebVitals from './reportWebVitals';


/** Corresponds to http URL */
const httpUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8081/graphql' : `${process.env.REACT_APP_TOWNS_SERVICE_URL}/graphql`;

const client = new ApolloClient({
  uri: httpUrl,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <Auth0Provider
    domain="dev-fse.us.auth0.com"
    clientId="jgJh7ejkWNLMjNAv1oMKVtuBYsoaYcRh"
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <ApolloProvider client = {client}>
        <App />
      </ApolloProvider>
  </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
