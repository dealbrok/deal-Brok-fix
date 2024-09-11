import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

const HomePage = ({ socket }) => {
  const [name, setName] = useState();
  const [token, setToken] = useState();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const test = () => {
    socket.emit("create-room");
  };

  const getData = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/room", {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setData(data);
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
      console.log(message, "ss");
    });
    return () => {
      socket.off("hello");
      socket.disconnect();
    };
  }, []);

  const postName = async () => {
    try {
      await axios.post(
        "http://localhost:3000/room",
        {
          name,
          token,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        },
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

  const handleSubmit = (e) => {
    e.preventDefault();
    postName();
  };

  const gotoChat = (id) => {
    navigate(`/chat/${id}`);
  };
  return (
    <>
      <div className="w-full">
        <div className="p-10">
          <button
            className="btn"
            onClick={() => {
              document.getElementById("my_modal_2").showModal();
              test();
            }}
          >
            Add new Room Chat
          </button>
          <dialog
            id="my_modal_2"
            className="modal"
          >
            <div className="modal-box">
              <h1 className="text-center mb-5">Input Name</h1>
              <div className=" flex justify-center">
                <form onSubmit={handleSubmit}>
                  <div>
                    <input
                      className="input input-bordered join-item"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mt-5">
                    <input
                      className="input input-bordered join-item"
                      placeholder="Token"
                      onChange={(e) => setToken(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-center mt-5">
                    <button
                      type="submit"
                      className="btn join-item rounded-r-full"
                    >
                      submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <form
              method="dialog"
              className="modal-backdrop"
            >
              <button>close</button>
            </form>
          </dialog>
        </div>
        <div>
          <div className="grid grid-cols-3 mx-28">
            {data &&
              data.map((el, i) => (
                <div
                  onClick={() => gotoChat(el.id)}
                  key={el.id}
                  className="w-[300px] h-[420px] bg-transparent cursor-pointer group perspective mb-5"
                >
                  <div className="relative preserve-3d group-hover:my-rotate-y-180 w-full h-full duration-1000">
                    <div className="absolute backface-hidden border-2 w-full h-full">
                      <h1 className="text-center">
                        Click Here to Join room {i + 1}
                      </h1>
                    </div>
                    <div className="absolute my-rotate-y-180 backface-hidden w-full h-full bg-gray-100 overflow-hidden">
                      <div className="text-center flex flex-col items-center justify-center h-full text-gray-800 px-2 pb-24">
                        <h1 className="text-3xl font-semibold">{el.name}</h1>
                        <button className="bg-teal-500 px-6 py-2 font-semibold text-white rounded-full absolute -bottom-20 delay-500 duration-1000 group-hover:bottom-20 scale-0 group-hover:scale-125">
                          Join Room
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
