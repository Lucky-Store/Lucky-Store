import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { AuthContextProvider } from "./context/AuthContext";
import { CartStateContext } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <CartStateContext>
          <App />
        </CartStateContext>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
