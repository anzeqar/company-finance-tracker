import React, { useState } from "react";

const Index = ({ auth, setAuth }) => {
  const secretKey = "ZK78D24C-02SAF-4C5B6-B0E9-8DED0A8C30CW";
  const [key, setKey] = useState("");
  const [copy, setCopy] = useState("Click Above to Copy Key");
  const keySubmit = (e) => {
    e.preventDefault();
    if (key === secretKey) {
      setAuth(true);
    } else {
      document.getElementById("secret-key").value = "";
      setTimeout(() => {
        document.getElementById("error-message").innerHTML = ``;
      }, 1500);
      document.getElementById(
        "error-message"
      ).innerHTML = `<p className="text-danger">Error: Invalid Key</p>`;
      setKey("");
    }
  };

  function copyToClipboard(textToCopy) {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
      // navigator clipboard api method'
      return navigator.clipboard.writeText(textToCopy);
    } else {
      // text area method
      let textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      // make the textarea out of viewport
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise((res, rej) => {
        // here the magic happens
        document.execCommand("copy") ? res() : rej();
        textArea.remove();
      });
    }
  }
  return (
    <div className="login-bg">
      <div id="" className=" text-center">
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ paddingTop: "20vh" }}
        >
          <p
            className="pb-0 text-secondary"
            onClick={async (e) => {
              await copyToClipboard(secretKey);
              setCopy("Key Copied To Clipboard");
            }}
            style={{ cursor: "pointer" }}
          >
            Demo Key : {secretKey}
          </p>
          <p className="pt-0 text-secondary">{copy}</p>
          <div className="text-white p-4">
            <h1 className="mb-4">Company Finance Tracker</h1>
            <div
              className="bg-transparent text-danger p-0 rounded"
              id="error-message"
            ></div>
            <form className="mt-4" onSubmit={keySubmit}>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="secret-key"
                  name="secret-key"
                  className="form-control bg-transparent p-2 text-light border-0 border-bottom rounded-0 border-info"
                  placeholder="Enter Secret Key"
                  onChange={(e) => setKey(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block w-100">
                Get Access
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
