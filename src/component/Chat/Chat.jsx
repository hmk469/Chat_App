import React, { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';
import { user } from "../Join/Join";
import "../Chat/Chat.css";
import Message from '../Message/Message';
import ReactScrollToBottom from "react-scroll-to-bottom"

export default function Chat() {
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    const message = document.getElementById('chatInput').value;
    socket.emit('message', { message, id: socket.id });
    document.getElementById('chatInput').value = "";
  }

  useEffect(() => {
    const socket = socketIO('http://localhost:5000', { transports: ['websocket'] });
    socket.on("sendMessage", (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
      console.log(data.user, data.message, data.id);
    });

    socket.on('connect', () => {
      socket.emit('joined', { user });

      socket.on('welcome', (data) => {
        setMessages(prevMessages => [...prevMessages, data]);
        console.log(data.user, data.message);
      });

      socket.on('userJoined', (data) => {
        console.log(data.user, data.message);
      });

      socket.on('leave', (data) => {
        setMessages(prevMessages => [...prevMessages, data]);
        console.log(data.user, data.message);
      });

      setUserId(socket.id);
      setSocket(socket);
    });

    return () => {
      if (socket) {
        console.log(`${user} has disconnected`);
        socket.off('welcome');
        socket.disconnect();
      }
    };
  }, []);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>Chat App</h2>
          <a href="/">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/VisualEditor_-_Icon_-_Close_-_white.svg/2048px-VisualEditor_-_Icon_-_Close_-_white.svg.png" alt="" />
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => (
            <Message
              user={item.id === userId ? "" : item.user}
              message={item.message}
              classs={item.id === userId ? "right" : "left"}
              key={i}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input type="text" id="chatInput" />
          <button className='SendBtn' onClick={sendMessage}>
            <img src="https://img.icons8.com/?size=1x&id=g8ltXTwIfJ1n&format=png" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
