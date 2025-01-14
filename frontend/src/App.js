import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';

function AddExpenseComponent() {
  const [expenses, setExpenses] = useState([]);
  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  } ;
  return (
    <div>
       <nav>
        <Link to="/register">Register</Link>
      </nav>
      <AddExpenseForm onAddExpense={addExpense} />
      <ExpenseList expenses={expenses} onDelete={deleteExpense} />
    </div>
  );
}

export default AddExpenseComponent;