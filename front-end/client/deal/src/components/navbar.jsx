import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentTheme, setCurrentTheme, theme } = useContext(themeContext);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleThemeOnClickHandler = () => {
    setCurrentTheme(currentTheme === "light" ? "dark" : "light");
  };

  return (
    <div className="navbar bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md px-6 py-4 rounded-b-lg backdrop-blur-md bg-opacity-80">
      <div className="flex-1">
        <a className="text-2xl font-bold cursor-pointer" onClick={()=> navigate("/")}>DealBroker</a>
      </div>

      <div className="flex items-center justify-between gap-4">
        {/* Theme toggle button */}
        <button
          onClick={handleThemeOnClickHandler}
          className="bg-white text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-100 transition font-medium"
        > 
          Toggle Theme
        </button>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
