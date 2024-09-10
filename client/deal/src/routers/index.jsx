import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "../views/baseLayout";
import HomePage from "../views/homePage";
import LoginPage from "../views/loginPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <BaseLayout />,
    loader: () => {
      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
