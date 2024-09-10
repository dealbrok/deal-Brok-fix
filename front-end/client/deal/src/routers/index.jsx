import { createBrowserRouter, redirect } from "react-router-dom";
import BaseLayout from "../views/baseLayout";
import HomePage from "../views/homePage";
import LoginPage from "../views/loginPage";
import RegisterPage from "../views/registerPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
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
