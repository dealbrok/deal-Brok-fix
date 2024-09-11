import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routers/index";
import "toastify-js/src/toastify.css";

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
