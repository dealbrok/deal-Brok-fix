import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routers/index";
import "toastify-js/src/toastify.css";
import ThemeProvider from "./context/ThemeContext";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <RouterProvider router={router} />,
  </ThemeProvider>
);
