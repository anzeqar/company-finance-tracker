const CurrencyFormat = (amount) => {
  var n1, n2;
  amount = amount + "" || "";
  n1 = amount.split(".");
  n2 = n1[1] || null;
  n1 = n1[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  amount = n2 ? n1 + "." + n2 : n1;
  return amount;
};
export default CurrencyFormat;
