import { createBrowserRouter, redirect } from "react-router-dom";
import BaseLayout from "../views/baseLayout";
import { io } from "socket.io-client";
import HomePage from "../views/homePage";
import LoginPage from "../views/loginPage";
import RegisterPage from "../views/registerPage";
import ChatPage from "../views/chatPage";
import HomeLoading from "../views/homeLoading";

/*
[>>> running using localhost <<<]
const socket = io("http://localhost:3000", {
  autoConnect: false,
});
*/

const socket = io("https://project.athiflanang.site", {
  autoConnect: false,
});

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
        element: <HomePage socket={socket} />,
      },
      {
        path: "/home",
        element: <HomeLoading />,
      },
      {
        path: "/chat/:id",
        element: <ChatPage socket={socket} />,
      },
    ],
  },
]);

export default router;
