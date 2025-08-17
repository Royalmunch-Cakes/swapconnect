"use client";
import React, { useState } from "react";
import { useAuthToken } from "@/hooks/useAuthToken";

import { io } from "socket.io-client";

function SupportPage() {
  const token = useAuthToken();
  const [messages, setMessages] = useState([
    { from: "admin", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const socket = io("https://swapconnect-api.onrender.com", {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }); // Adjust the URL as needed

  socket.on("connect", () => {
    console.log(socket.id);
  });

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { from: "user", text: input }]);
      setInput("");
      // Here you would also send the message to your backend or chat service
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto p-4">
        <h2 className="text-2xl text-black font-bold mb-4">Support Chat</h2>
        <div className="border rounded p-4 h-64 overflow-y-auto bg-white mb-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={msg.from === "user" ? "text-right" : "text-left"}
            >
              <span
                className={msg.from === "user" ? "bg-green-500" : "bg-blue-500"}
                style={{
                  borderRadius: 8,
                  padding: 4,
                  display: "inline-block",
                  margin: 2,
                }}
              >
                <b>{msg.from === "user" ? "You" : "Admin"}:</b> {msg.text}
              </span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded p-2 text-black"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default SupportPage;
