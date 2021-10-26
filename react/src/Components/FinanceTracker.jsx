import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState.jsx";
import CurrencyFormat from "../utils/CurrencyFormat.jsx";

const FinanceTracker = () => {
  const { transactions, addTransaction, getTransactions } =
    useContext(GlobalContext);
  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line
  }, []);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const balanceAmount = transactions
    .map((transaction) => transaction.amount)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  const revenueAmount = transactions
    .filter((transactions) => transactions.amount >= 0)
    .map((transaction) => transaction.amount)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  const expenditureAmount = transactions
    .filter((transactions) => transactions.amount < 0)
    .map((transaction) => transaction.amount)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  const submitActivity = (e) => {
    e.preventDefault();

    const newTransaction = {
      text,
      amount: Number(amount),
    };

    addTransaction(newTransaction);
    setText("");
    setAmount(0);
    document.getElementById("amount").value = "";
  };

  const logOut = () => {
    localStorage.removeItem("authToken");
    window.location.reload();
  };
  return (
    <>
      <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand text-light" href="/">
            Company Finance Tracker{" "}
          </a>

          <span className="btn btn-danger ms-auto" onClick={logOut}>
            <i class="fa fa-sign-out" aria-hidden="true"></i>
          </span>
        </div>
      </nav>
      <div className="container bg-dark text-light mt-4">
        <h3 className=""> </h3>

        <div className="container mb-4 col-10 ">
          <div className="row ">
            <div className="col-sm-4 mb-4">
              <div className="card bg-dark border-2 border-primary h-100">
                <div className="card-body">
                  <h5 className="card-title text-center">BALANCE</h5>
                  <p className="h3 p-3 card-text text-center">
                    ₹ {CurrencyFormat(balanceAmount)}
                  </p>
                  <div className="text-center justify-content-center d-flex">
                    <Link to={"/balance"} className=" btn btn-primary">
                      See Activities
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4 mb-4">
              <div className="card bg-dark border-2 border-success">
                <div className="card-body">
                  <h5 className="card-title text-center">REVENUE</h5>
                  <p className="h3 p-3 card-text text-center">
                    ₹ {CurrencyFormat(revenueAmount)}
                  </p>
                  <div className="text-center justify-content-center d-flex">
                    <Link to={"/revenue"} className=" btn btn-success">
                      See Activities
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card bg-dark border-2 border-danger">
                <div className="card-body">
                  <h5 className="card-title text-center">EXPENDITURE</h5>
                  <p className="h3 p-3 card-text text-center">
                    ₹ {CurrencyFormat(expenditureAmount)}
                  </p>
                  <div className="text-center justify-content-center d-flex">
                    <Link to={"/expenditure"} className=" btn btn-danger">
                      See Activities
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container col-10">
          <h2 className="h2 text-center pb-2">Enter Activities</h2>
          <form method="post" onSubmit={submitActivity}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control bg-dark border-0 rounded-0 border-bottom border-info text-light"
                id="text"
                aria-describedby="emailHelp"
                placeholder="Enter Name of the Activity"
                required={true}
                name="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control bg-dark border-0 rounded-0 border-bottom border-info text-light"
                id="amount"
                step="0.01"
                placeholder="Enter Amount in ₹"
                required={true}
                name="amount"
                onChange={(e) => setAmount(e.target.value)}
              />
              <p className="pt-1 text-center">
                +/- Amount: Revenue/Expenditure
              </p>
            </div>

            <button type="submit" className="btn btn-primary btn-block w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FinanceTracker;
