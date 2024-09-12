import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";

const ChatPage = ({ socket }) => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const { currentTheme, theme } = useContext(themeContext);
  console.log(chat);

  const handleSubmit = (e) => {
    e.preventDefault();
    let name = localStorage.name;
    let obj = {
      message,
      name,
    };
    socket.emit("newMessages", obj, id);
    setMessage("");
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
            <button className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-l-lg hover:bg-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z" />
              </svg>
            </button>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex">
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
