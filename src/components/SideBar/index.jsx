import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import {
  createRoomInFireStoreBasedOnUserId,
  readCollectionFromFirestore,
} from "../../firebase";

import { useStateValue } from "../context/User";

import chatIcon from "../../assets/chat.png";
import SidebarChat from "../SidebarChat";

import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import "./sidebar.scss";

export default function SideBar() {
  const [rooms, setRooms] = useState([]);
  const [inputDialog, setinputDialog] = useState({
    isVisible: false,
    roomName: "",
  });

  const [state, _] = useStateValue();

  useEffect(() => {
    const unsubscribe = readCollection();

    return () => unsubscribe;
  }, []);

  const readCollection = () => {
    const querySnapshot = readCollectionFromFirestore("rooms");

    onSnapshot(querySnapshot, (querySnapshot) =>
      setRooms(
        querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      )
    );

    // querySnapshot.forEach((doc) => {
    //   setRooms((prev) => [...prev, { id: doc.id, data: doc.data() }]);
    // });
  };

  const openInputDialog = () => {
    setinputDialog((prev) => ({ ...prev, isVisible: !prev.isVisible }));
  };

  const addRoomToChats = async () => {
    const roomId = state.user.uid;

    if (inputDialog.roomName !== "") {
      const newRoomRef = await createRoomInFireStoreBasedOnUserId(
        "rooms",
        inputDialog.roomName,
        "online"
      );

      // create a messages collection inside rooms collection specific document
      const messagesRef = collection(newRoomRef, "messages");

      // set some message to message collection to create messages collection in firestore
      await addDoc(messagesRef, {
        name: state.displayName,
        text: "hii",
        timestamp: serverTimestamp(),
      });

      setinputDialog((prev) => ({ ...prev, isVisible: false }));
    } else {
      alert("Please enter a room name");
    }
  };

  return (
    <>
      <div className="sidebar-wrapper">
        <div className="sidebar-header">
          <div className="logo-container">
            <img src={chatIcon} alt="chat logo" className="chat-logo" />
            <h1 className="logo-title">ColdBurnChat</h1>
          </div>
          <div className="sidebar-profile">
            <div className="sidebar-profile-img">
              <img
                src="https://api.dicebear.com/5.x/micah/svg?seed=Felix"
                alt="profile-image"
              />
            </div>
            <h2 className="sidebar-profile-name">{state.displayName}</h2>
            <div className="sidebar-profile-status">
              <div className="status-active-icon"></div>
              <span className="status-title">{state.status}</span>
            </div>
          </div>
        </div>
        <div className="sidebar-chats">
          <div className="sidebar-chats-room-header">
            <h2 className="sidebar-chats-title">Chats</h2>
            <svg
              onClick={openInputDialog}
              xmlns="http://www.w3.org/2000/svg"
              className="ionicon"
              viewBox="0 0 512 512"
            >
              <path
                d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeWidth="32"
              />
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M256 176v160M336 256H176"
              />
            </svg>
          </div>
          {inputDialog.isVisible && (
            <div className="input-dialog-wrapper">
              <div className="input-dialog-card">
                <label htmlFor="inputRoomName">Room name</label>
                <input
                  type="text"
                  name="RoomName"
                  id="inputRoomName"
                  value={inputDialog.roomName}
                  onChange={(e) =>
                    setinputDialog((prev) => ({
                      ...prev,
                      roomName: e.target.value,
                    }))
                  }
                />
                <button className="input-dialog-btn" onClick={addRoomToChats}>
                  Create Room
                </button>
              </div>
            </div>
          )}
          <div className="sidebar-chats-user-container">
            {rooms.map(({ id, data }) => (
              <SidebarChat key={id} roomId={id} chatName={data.name} />
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
