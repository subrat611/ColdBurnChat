import "./sidebar.scss";

import chatIcon from "../../assets/chat.png";
import SidebarChat from "../SidebarChat";

export default function SideBar() {
  return (
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
          <h2 className="sidebar-profile-name">flex frady</h2>
          <div className="sidebar-profile-status">
            <div className="status-active-icon"></div>
            <span className="status-title">Active</span>
          </div>
        </div>
      </div>
      <div className="sidebar-chats">
        <h2 className="sidebar-chats-title">Chats</h2>
        <div className="sidebar-chats-user-container">
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
        </div>
      </div>
    </div>
  );
}
