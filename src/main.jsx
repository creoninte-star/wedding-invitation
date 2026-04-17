import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const rootElement = document.getElementById('root');
if (!rootElement) {
  document.body.innerHTML = '<div style="color:red; padding: 20px;">Error: Root element not found!</div>';
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  } catch (error) {
    console.error("Critical error during render:", error);
    rootElement.innerHTML = `<div style="color:red; padding: 20px;">Critical error: ${error.message}</div>`;
  }
}
