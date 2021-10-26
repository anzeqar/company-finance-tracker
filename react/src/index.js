import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <div class="footer mt-4">
      <p class="text-light text-center">
        Developed by
        <span> </span>
        <a
          href="https://github.com/anzeqar"
          rel="noreferrer"
          class="link-info"
          target="_blank"
        >
          @anzeqar
        </a>
      </p>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
