import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../assets/Animation - 1725973319141.json";
import Toastify from "toastify-js";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      await axios.post("http://localhost:3000/register", {
        username,
        password,
      });

      Toastify({
        text: "Success Register",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #007BFF, #00C6FF)",
        },
      }).showToast();

      navigate("/login");
    } catch (err) {
      Toastify({
        text: err.response?.data?.message || "Register failed",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #ff4e50, #f9d423)",
        },
      }).showToast();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
  };

  return (
    <div className="min-h-screen flex justify-center items-center relative bg-gradient-to-b from-blue-400 to-blue-600">
   
      {/* Register Card */}
      <div className="relative z-10 bg-white bg-opacity-80 rounded-xl shadow-xl p-6 max-w-xs w-full backdrop-blur-lg border border-white border-opacity-40">
        <h2 className="text-center text-2xl font-bold text-blue-800 mb-4">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 rounded-lg bg-white text-blue-800 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              id="username"
              placeholder="Username"
            />
            <i className="absolute right-3 top-2 text-blue-500">👤</i>
          </div>
          <div className="mb-4 relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-lg bg-white text-blue-800 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              id="password"
              placeholder="Password"
            />
            <i className="absolute right-3 top-2 text-blue-500">🔒</i>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg font-semibold transition"
          >
            Register
          </button>
        </form>
        <p className="text-center text-blue-700 text-sm mt-4">
          Already have an account?{" "}
          <a
            onClick={() => navigate("/login")}
            className="underline hover:text-blue-500 cursor-pointer"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
