import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { readCollectionFromFirestore } from "../../firebase";

import { useStateValue } from "../context/User";

import chatIcon from "../../assets/chat.png";
import SidebarChat from "../SidebarChat";

import "./sidebar.scss";

export default function SideBar() {
  const [rooms, setRooms] = useState([]);

  const [state, _] = useStateValue();

  useEffect(() => {
    const unsubscribe = readCollection();

    return () => unsubscribe;
  }, []);

  const readCollection = async () => {
    const querySnapshot = await readCollectionFromFirestore("rooms");
    querySnapshot.forEach((doc) => {
      setRooms((prev) => [...prev, { id: doc.id, data: doc.data() }]);
    });
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
              <span className="status-title">Active</span>
            </div>
          </div>
        </div>
        <div className="sidebar-chats">
          <h2 className="sidebar-chats-title">Chats</h2>
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
