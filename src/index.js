import React from 'react';
import ReactDOM from 'react-dom/client';
import { GithubContextProvider } from './components/context/github/GithubContext';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GithubContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GithubContextProvider>,
);
