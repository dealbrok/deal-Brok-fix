import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ChatPage = ({ socket }) => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [valueMessage, setValueMessage] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("newMessages", message);
    setMessage("");
  };

  useEffect(() => {
    socket.connect();
    socket.on("messagesFromServer", (msg) => {
      setValueMessage((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.disconnect();
      socket.off("messagesFromServer");
    };
  }, [socket]);

  return (
    <div className="flex flex-col h-screen bg-rose-50">
      <div id="messageContainer" className="flex-1 overflow-auto p-4 bg-white border-t border-gray-300">
        <div className="space-y-2">
          {valueMessage.map((msg, index) => (
            <div
              className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white block max-w-xs break-words"
              key={index}
            >
              {msg}
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 bg-gray-800 border-t border-gray-600 mb-10">
        <div className="flex justify-center">
          <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <input
              type="text"
              className="w-full bg-gray-300 py-5 px-3 rounded-xl"
              placeholder="Type a message..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
