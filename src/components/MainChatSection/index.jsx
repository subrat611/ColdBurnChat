import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import {
  readCollectionFromFirestoreBasedOnId,
  readNestedCollectionFromFirestore,
} from "../../firebase";

import { useStateValue } from "../context/User";

import sendIcon from "../../assets/paper.png";

import "./mainchat.scss";

export default function MainChatSection() {
  const [msg, setMsg] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [serverMsg, setServerMsg] = useState([]);
  const { roomId } = useParams();

  const [state, _] = useStateValue();

  const nestDocSnap = readNestedCollectionFromFirestore(
    "rooms",
    roomId,
    "messages"
  );

  useEffect(() => {
    setServerMsg([]);
    if (roomId) {
      readSpecificDocFromFirestore();

      const sortByTimeStampNestDocSnap = query(
        nestDocSnap,
        orderBy("timestamp")
      );

      const unsubscribe = onSnapshot(
        sortByTimeStampNestDocSnap,
        (querySnapshot) => {
          setServerMsg(querySnapshot.docs.map((doc) => doc.data()));
        }
      );

      return unsubscribe;
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

  const msgHandler = async (e) => {
    e.preventDefault();

    try {
      const newMsg = {
        text: msg,
        name: state.displayName,
        timestamp: serverTimestamp(),
      };
      addDoc(nestDocSnap, newMsg);
    } catch (err) {
      alert("Message not add to db some error occur");
    }

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
          ? serverMsg.map(({ text, name, timestamp }, i) => (
              <div
                className={`main-chat-body-msg-${
                  name === state.displayName ? "sender" : "receiver"
                }`}
                key={i}
              >
                <p
                  className={`msg-owner-${
                    name === state.displayName ? "sender" : "receiver"
                  }-name
                `}
                >
                  {name}
                </p>
                <p className="msg">{text}</p>
                {/* <span className="time-stamp">
                  {}
                </span> */}
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
