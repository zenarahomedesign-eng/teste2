import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import 'react-toastify/dist/ReactToastify.css';

const style = document.createElement('style');
style.innerHTML = `
  body, #root {
    background-color: hsl(var(--background)) !important;
  }
`;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
