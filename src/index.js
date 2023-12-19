import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App/App";
import { Provider } from "react-redux";
import store from "./components/store";

const root = document.getElementById("root");
const rootNode = createRoot(root);

rootNode.render(
  <Provider store={store}>
    <App />
  </Provider>
);
