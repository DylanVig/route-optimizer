import React, { useState, useEffect } from "react";
import { AccountOperations } from "./AccountOperations.js";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Route from "../Route/Route.js";
import './Account.css';

export default function Account({ userId }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const success = (data) => {
      console.log("Data received:", data);
      if (data && typeof data === "object") {
        setUsername(data.username);
        setPassword(data.password);
        setName(data.name);
        console.log("Username set to:", data.username);
        console.log("Password set to:", data.password);
        console.log("Name set to:", data.name);
      } else {
        console.log("Unexpected data format:", data);
      }
    };
    const failure = (message) => {
      console.log("Failed: " + message);
      alert("Retrieval Failed: " + message);
      setError(message);
    };
    AccountOperations.getUserDetails(userId, success, failure);
  }, [userId]);

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div className="account">
      <h1>Hey {name}, Let's Create a Route!</h1>
      <Popup
        trigger={<button className="button"> Create Route </button>}
        modal
        nested
      >
        {close => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <center>
              <div className="header" style={{ fontSize: '32px', fontWeight: 'bold' }}> Create Route </div>
              <div className="scrollable-content">
                <Route user={userId} />
              </div>
            </center>
          </div>
        )}
      </Popup>
    </div>
  );
}
