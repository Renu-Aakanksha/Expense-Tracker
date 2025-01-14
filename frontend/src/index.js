import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddExpenseForm from './components/AddExpenseForm';
import Login from './pages/login';
import Register from './pages/register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/Register" element={<Register />} /> {/* Use Register instead of register */}
         <Route path="/Login" element={<Login />} />
        <Route path="/AddExpenseForm" element={<AddExpenseForm />} />
      </Routes>
    </Router>
  </React.StrictMode>
);