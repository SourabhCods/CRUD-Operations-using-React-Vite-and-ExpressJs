import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-ilie85ijjxp61hix.us.auth0.com"
    clientId="IgV4CBM4I5pum2sBCKr7aPwzU78Ukv8J"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
      <App />
  
  </Auth0Provider>
    
  
)
