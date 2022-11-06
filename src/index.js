import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { MoralisProvider } from "react-moralis";
import { BrowserRouter } from "react-router-dom"
require('dotenv').config();

ReactDOM.render(

  <MoralisProvider appId={process.env.REACT_APP_MORALIS_SERVER_APP_ID} serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL}>
      <BrowserRouter>
      <App />
    </BrowserRouter>
    </MoralisProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
