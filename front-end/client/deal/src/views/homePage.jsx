import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import { useContext } from "react";
import Lottie from "lottie-react";
import emptyData from "../assets/emptyDataAnimation.json";

import { themeContext } from "../context/ThemeContext";

const HomePage = ({ socket }) => {
  const [name, setName] = useState();
  const [token, setToken] = useState();
  const [tokenValidation, setTokenValidation] = useState();
  const [idTokenValid, setIdTokenValid] = useState();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { currentTheme, theme } = useContext(themeContext);

  useEffect(() => {
    socket.connect();
    socket.on("messagesFromServer", (msg) => {
      setChat((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("messagesFromServer");
      socket.disconnect();
    };
  }, [socket]);

  const url = "http://localhost:3000";

  const getData = async () => {
    try {
      const { data } = await axios.get(`${url}/room`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setData(data);
    } catch (err) {
      console.log(err);
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
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    socket.connect();
    socket.on("welcome", (message) => {
      console.log(message);
    });
    return () => {
      socket.off("hello");
      socket.disconnect();
    };
  }, []);

  const postName = async () => {
    try {
      await axios.post(
        `${url}/room`,
        {
          name,
          token,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      getData();
      Toastify({
        text: "Add Room Success",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    } catch (err) {
      getData();
      document.getElementById("my_modal_2").close();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postName();
  };

  const handleToken = (e) => {
    e.preventDefault();
    tokenValid();
  };

  const tokenValid = async () => {
    const res = await axios.get(`${url}/room/${idTokenValid}`, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });

    const { data } = res;
    if (data.token == tokenValidation) {
      Toastify({
        text: "Berhasil Masuk Ke Room Chat",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
      navigate(`/chat/${idTokenValid}`);
    } else {
      Toastify({
        text: "Token Salah",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "red",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  };

  const gotoChat = (id, token) => {
    if (!token) {
      socket.emit("joinRoom", { roomId: id, name: localStorage.name });
      navigate(`/chat/${id}`);
    } else {
      document.getElementById("my_modal_3").showModal();
      setIdTokenValid(id);
    }
  };
  return (
    <>
      {/* +++ UPDATE +++ */}
      <div className={theme[currentTheme].bgColor}>
        <div className="w-full min-h-screen">
          <div className="p-3 flex justify-center items-center">
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 text-xl rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate"
              onClick={() => {
                document.getElementById("my_modal_2").showModal();
              }}
            >
              Add new Room Chat
            </button>
            <dialog id="my_modal_2" className="modal">
              <div className="modal-box p-10 relative">
                {/* Tombol silang di pojok kanan atas */}
                <form method="dialog">
                  <button className="absolute right-4 top-4 text-xl text-gray-500 hover:text-red-500">
                    &times;
                  </button>
                </form>

                <h1 className="text-center mb-5">Input Room Name</h1>
                <div className="flex justify-center">
                  <form onSubmit={handleSubmit}>
                    <div>
                      <input
                        className="input input-bordered join-item border-2 border-gray-300 rounded-lg p-1"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mt-5">
                      <input
                        className="input input-bordered join-item border-2 border-gray-300 rounded-lg p-1"
                        placeholder="Token"
                        onChange={(e) => setToken(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-center mt-5">
                      <button
                        type="submit"
                        className="btn join-item rounded-r-full"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </dialog>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box px-8 py-10 relative rounded-2xl shadow-xl">
                {/* Tombol Close (X) */}
                <form method="dialog">
                  <button
                    className="absolute right-4 top-4 text-2xl text-gray-400 hover:text-red-500 transition duration-200"
                    aria-label="Close"
                  >
                    &times;
                  </button>
                </form>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
                  Input Token Room
                </h2>

                {/* Form */}
                <form
                  onSubmit={handleToken}
                  className="flex flex-col items-center gap-4"
                >
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs border-gray-300 rounded-lg px-4 py-2 text-center"
                    placeholder="Enter Token"
                    onChange={(e) => setTokenValidation(e.target.value)}
                    required
                  />

                  <button
                    type="submit"
                    className="btn btn-primary w-full max-w-xs rounded-lg"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </dialog>
          </div>
          <div className="flex justify-center items-center">
            {data.length === 0 ? (
              <div className="w-full h-1/4 flex-row justify-center items-center">
                <p className="text-2xl text-center">
                  Opps! It seems like no rooms are found, please create a room
                  first
                </p>
                <div className="w-1/4 h-full justify-center items-center">
                  <Lottie animationData={emptyData} />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 mx-28">
                {data &&
                  data.map((el, i) => (
                    <div
                      onClick={() => gotoChat(el.id, el.token)}
                      key={el.id}
                      className="w-[300px] h-[420px] bg-transparent cursor-pointer group perspective mb-5 mr-5"
                    >
                      <div className="relative border-2 border-gray-500 preserve-3d w-full h-full duration-1000">
                        <div className="flex justify-center items-center border-2 w-full h-full">
                          <h1 className="text-center">
                            Click Here to Join {el.name} room
                          </h1>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        {/* +++ UPDATE +++ */}
      </div>
    </>
  );
};

export default HomePage;
