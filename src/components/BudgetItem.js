function ExpenseItem({ item }) {
  return (
    <div className="  Expense-item">
      <h2>{item.name}</h2>
      <p>Amount: ${item.amount}</p>
    </div>
  );
}

export default  ExpenseItem;