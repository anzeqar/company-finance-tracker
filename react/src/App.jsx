import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState.jsx";
import Index from "./Components/Index.jsx";
import FinanceTracker from "./Components/FinanceTracker.jsx";
import "./App.css";
import Revenue from "./Components/Revenue.jsx";
import Expenditure from "./Components/Expenditure.jsx";
import Balance from "./Components/Balance.jsx";
const App = () => {
  let authToken = localStorage.getItem("authToken");
  let settingAuth;
  if (authToken === null) {
    settingAuth = false;
  }
  if (authToken) {
    settingAuth = true;
  } else {
    settingAuth = false;
  }
  const [auth, setAuth] = useState(settingAuth);
  if (auth === true) {
    localStorage.setItem("authToken", true);
  }
  return (
    <Router>
      {auth === false ? (
        <Switch>
          <Route path="/" exact>
            <Index auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/">
            <Redirect to={"/"} />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <GlobalProvider>
            <Route path="/" exact>
              <FinanceTracker />
            </Route>
            <Route path="/revenue" exact>
              <Revenue />
            </Route>
            <Route path="/expenditure" exact>
              <Expenditure />
            </Route>
            <Route path="/balance" exact>
              <Balance />
            </Route>
            <Route path="/">
              <Redirect to={"/"} />
            </Route>
          </GlobalProvider>
        </Switch>
      )}
    </Router>
  );
};

export default App;
