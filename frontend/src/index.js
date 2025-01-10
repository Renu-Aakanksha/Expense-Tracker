import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import Register from './pages/Register.js'; // Ensure this matches the actual file name

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/Register" element={<Register />} /> {/* Use Register instead of register */}
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);