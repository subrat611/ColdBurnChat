import { useState } from "react";
import sendIcon from "../../assets/paper.png";

import "./mainchat.scss";

export default function MainChatSection() {
  const [msg, setMsg] = useState("");

  const msgHandler = (e) => {
    e.preventDefault();
    setMsg("");
  };

  return (
    <div className="main-chat-wrapper">
      <div className="main-chat-body">
        <div className="main-chat-body-msg-sender">
          <p className="msg">Hii...</p>
          <span className="time-stamp">12.00</span>
        </div>
        <div className="main-chat-body-msg-receiver">
          <p className="msg">Hii...</p>
          <span className="time-stamp">12.30</span>
        </div>
      </div>
      <form className="main-chat-footer" onSubmit={(e) => msgHandler(e)}>
        <div className="footer-message-box">
          <input
            type="text"
            placeholder="Write something..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
        </div>
        <button className="footer-send-btn" type="submit">
          <img src={sendIcon} alt="send-icon" />
          send
        </button>
      </form>
    </div>
  );
}
