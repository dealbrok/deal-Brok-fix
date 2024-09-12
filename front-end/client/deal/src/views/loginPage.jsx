import React, { useState } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/Animation - 1725973319141.json";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  /*
  [>>> url localhost <<<]
  const url = "http://localhost:3000"
  */
  const url = "https://project.athiflanang.site";

  const loginPost = async () => {
    try {
      const { data } = await axios.post(`${url}/login`, {
        username,
        password,
      });
      console.log(data);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("name", data.name);
      navigate("/home");
      Toastify({
        text: "Success Login",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #a838fc)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    } catch (err) {
      Toastify({
        text: err.response.data.message,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #fc0808, #a838fc)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginPost();
  };

  return (
    <div className="min-h-screen flex justify-center items-center relative bg-gradient-to-b from-purple-800 to-purple-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Lottie animationData={animationData} className="w-full min-h-max" />
      </div>
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
      {/* Login Card */}
      <div className="relative z-10 bg-white bg-opacity-10 rounded-xl shadow-xl p-4 max-w-xs w-full backdrop-blur-lg border border-white border-opacity-20">
        <h2 className="text-center text-2xl font-bold text-white mb-4">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="text"
              id="username"
              placeholder="Username"
            />
            <i className="absolute right-3 top-2 text-white font-normal not-italic">
              👤
            </i>
          </div>
          <div className="mb-4 relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="password"
              id="password"
              placeholder="Password"
            />
            <i className="absolute right-3 top-2 text-white font-normal not-italic">
              🔒
            </i>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-white text-sm mt-4">
          Don't have an account?{" "}
          <a href="#" className="underline hover:text-purple-300">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
