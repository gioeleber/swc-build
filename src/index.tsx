import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./assets/style/index.scss";
import {  RouterProvider } from "react-router-dom";
import router from "./routes/_router";

// Render the app
const rootElement = document.getElementById("app")!;
if (rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
