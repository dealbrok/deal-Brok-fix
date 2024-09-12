import { useNavigate } from "react-router-dom";
import { themeContext } from "../context/themeContext";
import { useContext } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentTheme, setCurrentTheme, theme } = useContext(themeContext);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DealBroker</a>
      </div>
      <div className="flex-none">
        <button
          onClick={handleLogout}
          className="btn "
        >
          Logout
        </button>
        <button className="btn ml-4">
          Switch to {currentTheme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>
    </div>
  );
};

export default Navbar;
