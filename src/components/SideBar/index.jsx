import "./sidebar.scss";

import chatIcon from "../../assets/chat.png";

export default function SideBar() {
  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-header">
        <div className="logo-container">
          <img src={chatIcon} alt="chat logo" className="chat-logo" />
          <h1 className="logo-title">ColdBurnChat</h1>
        </div>
        <div>profile</div>
      </div>
    </div>
  );
}
