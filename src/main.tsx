import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SuggestionsProvider } from './contexts/FireStoreProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SuggestionsProvider>
      <App />
    </SuggestionsProvider>
  </React.StrictMode>
);
