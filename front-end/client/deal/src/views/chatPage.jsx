import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";
import axios from "axios";

const ChatPage = ({ socket }) => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [image, setImage] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);
  const { currentTheme, theme } = useContext(themeContext);
  console.log(chat);

  const handleSubmit = (e) => {
    e.preventDefault();
    let name = localStorage.name;
    let obj = {
      message,
      name,
      image,
    };
    socket.emit("newMessages", obj, id);
    setMessage("");
  };

  const sendImage = async (e) => {
    e.preventDefault();

    let imageUrl = "";

    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      const url = "http://localhost:3000";

      try {
        const response = await axios.post(`${url}/upload`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);
        imageUrl = response.data.url``;
      } catch (err) {
        console.log("Failed to upload image", err);
      }
      setImage(null);
      setFileSelected(false);
    }
  };

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

  return (
    <>
      <div className="flex flex-col h-screen bg-rose-50">
        <div className={theme[currentTheme].bgColor}>
          <div className="flex-1 overflow-auto p-4 min-h-screen">
            {chat.map((el) =>
              el.name !== localStorage.name ? (
                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      />
                    </div>
                  </div>
                  <div className="chat-header">{el.name}</div>
                  <div className="chat-bubble">{el.message}</div>
                </div>
              ) : (
                <div className="chat chat-end">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      />
                    </div>
                  </div>
                  <div className="chat-header">{el.name}</div>
                  <div className="chat-bubble">{el.message}</div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="p-4 bg-gray-800 border-t border-gray-600 mb-10">
          <div className="flex">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex">
                <label htmlFor="image-upload" className="cursor-pointer mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 6l3 1m0 0l1-3h8l1 3 3 1v13a2 2 0 01-2 2H5a2 2 0 01-2-2V7l3-1zm3 5a3 3 0 116 0 3 3 0 01-6 0z"
                    />
                  </svg>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
                <input
                  type="text"
                  className="flex-1 p-2 border border-gray-300 rounded-l-lg w-full"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
