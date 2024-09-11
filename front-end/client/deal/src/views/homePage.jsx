import axios from "axios";
import { useEffect, useState } from "react";
import Toastify from "toastify-js";

const HomePage = ({ socket }) => {
  const [name, setName] = useState();
  const [token, setToken] = useState();
  const [data, setData] = useState();
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
      console.log(data);
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
          <div class="grid grid-cols-3 mx-28">
            <div class="w-[300px] h-[420px] bg-transparent cursor-pointer group perspective">
              <div class="relative preserve-3d group-hover:my-rotate-y-180 w-full h-full duration-1000">
                <div class="absolute backface-hidden border-2 w-full h-full">
                  <h1>names</h1>
                </div>
                <div class="absolute my-rotate-y-180 backface-hidden w-full h-full bg-gray-100 overflow-hidden">
                  <div class="text-center flex flex-col items-center justify-center h-full text-gray-800 px-2 pb-24">
                    <h1 class="text-3xl font-semibold">The King's Man</h1>
                    <p class="my-2">9.0 Rating</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Facilis itaque assumenda saepe animi maxime libero non
                      quasi, odit natus veritatis enim culpa nam inventore
                      doloribus quidem temporibus amet velit accusamus.
                    </p>
                    <button class="bg-teal-500 px-6 py-2 font-semibold text-white rounded-full absolute -bottom-20 delay-500 duration-1000 group-hover:bottom-20 scale-0 group-hover:scale-125">
                      Watch Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
