const path = require("path");
const express = require("express");
const router = require("./routes/transactions");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());

app.use("/api/transactions", router);

app.use(express.static("build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 5000);
