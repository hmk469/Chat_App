import React, { useState } from "react";
import "./Join.css";
import { Link } from "react-router-dom";

let user = ""; 

const sendUser = () => {
  const inputElement = document.getElementById("joinInput"); // Correct function name
  user = inputElement.value;
  inputElement.value = "";
};

const Join = () => {
  const [name, setName] = useState("");

  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img
          src="https://img.icons8.com/?size=1x&id=103407&format=png"
          alt="logo"
        />
        <h1>Chat App</h1>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter Your Name"
          id="joinInput"
          required
        />
        <Link to="/chat" onClick={(e) => (!name ? e.preventDefault() : null)}>
          <button onClick={sendUser} className="joinbtn">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { user };
