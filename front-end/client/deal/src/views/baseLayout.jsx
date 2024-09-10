import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const BaseLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default BaseLayout;
