import React, { useState } from 'react';
import './App.css';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';


function addExpense(){
  const[expenses, SetExpense] = useState([]);
  const addExpense = (expense) => {
    SetExpense([...expense, expense]);
  };
  return (
    <div>
      <AddExpenseForm onAddExpense={addExpense} />
      <ExpenseList expenses={expenses} />
    </div>
  );
}
export default addExpense;
