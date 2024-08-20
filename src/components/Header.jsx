import React, { useContext, useState } from "react";
import { HeaderContext } from "../Context/HeaderContext";
import "./Header.css";

const Header = () => {
  const { transactions, deleteTransaction, addTransaction } =
    useContext(HeaderContext);

  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts
    .reduce((total, amount) => (total += amount), 0)
    .toFixed(2);

  const income = amounts
    .filter((amount) => amount > 0).reduce((total, amount) => (total += amount), 0).toFixed(2);
  const expense = (
    amounts
      .filter((amount) => amount < 0).reduce((total, amount) => (total += amount), 0) * -1).toFixed(2);

  const [text, setText] = useState("");
  const [amount, setAmount] = useState();
  const [newValue, setNewValue] = useState();
  const onSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 1000000000),
      text,
      amount: +amount,
    };

       addTransaction(newTransaction)
       setText('')
       setAmount('')

  };



  return (
    <>
      <div className="headerContainer">
        <div className="container">
          <p className="title">Expense Tracker</p>
          <div className="balance">
            <p>Your Balance</p>
            <span>
              {total >= 0 ? "" : "-"}${Math.abs(total)}
            </span>
          </div>
          <div className="income_expense">
            <div className="Income i">
              <p className="i-t">Income</p>
              <p className="i-m" style={{ color: "green" }}>
                ${income}
              </p>
            </div>
            <div className="Expense i">
              <p className="i-t">Expense</p>
              <p className="i-m" style={{ color: "red" }}>
                ${expense}
              </p>
            </div>
          </div>
          <div>
            <p className="t-n">History</p>
            <hr />
          </div>
          <div className="history">
            {transactions.map((transaction) => (
              <div className="transactionList" key={transaction.id}>
                <p className="cash">{transaction.text}</p>
                <p className={transaction.amount > 0 ? "plus" : "minus"}>
                  {transaction.amount > 0 ? "+" : "-"}$
                  {Math.abs(transaction.amount)}
                </p>
                <button
                  className="del-btn"
                  onClick={() => deleteTransaction(transaction.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div>
            <p className="t-n">Add New Transaction</p>
            <hr />
          </div>
            <div className="addTransaction">
                <form onSubmit={onSubmit}>
              <div className="transactionName tr">
                <label htmlFor="text">Text</label>
                <input
                  type="text"
                  placeholder="Enter Text...."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div className="transactionAmount tr">
                <label htmlFor="Amount">Amount</label>
                <input
                  type="number"
                  placeholder="Enter your amount...."
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <button className="btn" type="submit">
                Add Transaction
              </button>
              </form>
            </div>
        </div>
      </div>
    </>
  );
};

export default Header;
