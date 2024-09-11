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
      <div className="flex-1 overflow-auto p-4 bg-white border-t border-gray-300">
        <div className="space-y-2">
          {valueMessage.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
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
