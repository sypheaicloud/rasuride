import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// 👇 1. Import the Google Provider
import { GoogleOAuthProvider } from '@react-oauth/google';

// 👇 2. Your Specific Client ID
const GOOGLE_CLIENT_ID = "729127278201-6i04cl7tu4uh82t645iv79d1pik64qpf.apps.googleusercontent.com";

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* 👇 3. Wrap App in the Provider */}
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);