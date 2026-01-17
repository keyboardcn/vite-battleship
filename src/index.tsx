import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.new.css';
import App from './app/app';
import { Provider } from 'react-redux'; // Import Provider
import store from './app/redux/store'; // Import the store
import reportWebVitals from './reportWebVitals';
import { GameProvider } from './app/battleshipTwoPlayers/game.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))

reportWebVitals();
