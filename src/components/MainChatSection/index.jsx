import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { readCollectionFromFirestoreBasedOnId } from "../../firebase";

import sendIcon from "../../assets/paper.png";

import "./mainchat.scss";

export default function MainChatSection() {
  const [msg, setMsg] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [serverMsg, setServerMsg] = useState([]);
  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      readSpecificDocFromFirestore();
    }
  }, [roomId]);

  const readSpecificDocFromFirestore = async () => {
    const docSnap = await readCollectionFromFirestoreBasedOnId("rooms", roomId);
    if (docSnap.exists()) {
      setRoomStatus({
        name: docSnap.data().name,
        status: docSnap.data().status,
      });
    }
  };

  const msgHandler = (e) => {
    e.preventDefault();
    setMsg("");
  };

  return (
    <div className="main-chat-wrapper">
      <div className="main-chat-header">
        <p className={`main-chat-header-chat-name ${roomStatus.status}`}>
          {roomStatus.name}
        </p>
      </div>
      <div className="main-chat-body">
        {serverMsg.length > 0
          ? serverMsg.map(({ text, owner, timeStamp }, i) => (
              <div className={`main-chat-body-msg-${owner}`} key={i}>
                <p className="msg">{text}</p>
                <span className="time-stamp">12.00</span>
              </div>
            ))
          : null}
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
