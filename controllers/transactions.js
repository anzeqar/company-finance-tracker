const Transaction = require("../models/Transaction");

exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({
      success: true,
      length: transactions.length,
      data: transactions,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      err: err,
    });
  }
};

exports.postTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;
    const transaction = await Transaction.create(req.body);
    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errMessages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        err: errMessages,
      });
    }
    return res.status(500).json({
      success: false,
      err: "Failed to Post Data",
    });
  }
};

exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        err: "Transaction not found",
      });
    }
    await Transaction.deleteOne(transaction);
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      err: "An Error Occurred",
    });
  }
};
