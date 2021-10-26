import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState.jsx";
import CurrencyFormat from "../utils/CurrencyFormat.jsx";

const Revenue = () => {
  const { transactions, deleteTransaction, getTransactions } =
    useContext(GlobalContext);
  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="mt-4">
      <div className="d-flex justify-content-center align-items-start">
        <d
          className="d-block"
          style={{ position: "absolute", top: "3.4%", left: "2%" }}
        >
          <Link to={"/"} className="">
            <i className="fas text-info fa-angle-left fs-1 p-2"></i>
          </Link>
        </d>

        <h1 className="h1 text-center text-light pb-4">Revenue</h1>
      </div>

      <div className="container col-11">
        <ul className="list-group border border-success">
          {transactions
            .filter((transaction) => transaction.amount >= 0)
            .map((transaction) => (
              <li
                className="list-group-item border border-success d-flex justify-content-between align-items-center bg-dark text-light fs-5"
                key={transaction._id}
              >
                <span className="d-block">
                  {transaction.text} <i class="fas ps-2 fa-arrow-right p-0"></i>{" "}
                  ₹ {CurrencyFormat(transaction.amount.toFixed(2))}
                </span>
                <span
                  className="fs-5"
                  onClick={() => deleteTransaction(transaction._id)}
                >
                  <i className="fas fa-trash-alt text-danger"></i>
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Revenue;
