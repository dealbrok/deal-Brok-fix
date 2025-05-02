import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";
import axios from "axios";

const ChatPage = ({ socket }) => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const { currentTheme, theme } = useContext(themeContext);

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
    socket.emit("joinRoom", { roomId: id, name: localStorage.name });

    socket.on("messagesFromServer", (msg) => {
      setChat((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("messagesFromServer");
      socket.disconnect();
    };
  }, [id, socket]);

  return (
    <div className={`flex flex-col h-screen ${theme[currentTheme].bgColor}`}>
      {/* Chat Messages */}
      <div className="flex-1 overflow-auto p-4 bg-gray-100">
        {chat.length === 0 ? (
          <div>No messages yet. Start chatting!</div>
        ) : (
          chat.map((el, index) => (
            <div
              key={index}
              className={
                el.name === localStorage.name
                  ? "chat chat-end"
                  : "chat chat-start"
              }
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div className="chat-header text-black">{el.name}</div>
              <div className="chat-bubble">{el.message}</div>
            </div>
          ))
        )}
      </div>

      {/* Message Input Form */}
      <div className="w-full bg-blue-300 flex justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full flex items-center space-x-2 max-w-xl mx-auto"
        >
          {/* Message Input */}
          <input
            type="text"
            className="message-input w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* Send Button */}
          <button
            type="submit"
            className="send-button px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!message}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
