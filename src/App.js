import React, { useState } from 'react';
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
      <AddExpenseForm onAddExpense={addExpense} />
      <ExpenseList expenses={expenses} onDelete={deleteExpense} />
    </div>
  );
}

export default AddExpenseComponent;