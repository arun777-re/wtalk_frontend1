import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./state/store.jsx";
import { CssBaseline } from "@mui/material";
import App from "./App.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={false} persistor={persistor}>
          <CssBaseline />
          <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
