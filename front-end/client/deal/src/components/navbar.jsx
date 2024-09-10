import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
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
        </div>
      </div>
    </>
  );
};

export default Navbar;
