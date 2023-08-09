import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { dataStore, persistor } from './store/index';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={dataStore}>
    <PersistGate Loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

