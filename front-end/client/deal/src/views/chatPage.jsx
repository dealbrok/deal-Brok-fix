import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ChatPage = ({ socket }) => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
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
    <div className="flex flex-col h-screen bg-rose-50">
      <div className="flex-1 overflow-auto p-4 bg-white border-t border-gray-300">
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
          ),
        )}
      </div>
      <div className="p-4 bg-gray-800 border-t border-gray-600 mb-10">
        <div className="flex">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded-l-lg"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
