import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../src/styles.css';
import 'katex/dist/katex.min.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
