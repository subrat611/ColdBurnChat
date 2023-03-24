import { Link } from "react-router-dom";
import "./chat.scss";

export default function SidebarChat({ roomId, chatName }) {
  return (
    <Link to={`/rooms/${roomId}`}>
      <div className="chat-wrapper">
        <div className="chat-profile">
          <img
            src="https://api.dicebear.com/5.x/micah/svg?seed=Felix"
            alt="avatar"
          />
        </div>
        <div className="chat-profile-info">
          <h3 className="chat-name">{chatName}</h3>
          <p className="chat-last-message">last message...</p>
        </div>
      </div>
    </Link>
  );
}
