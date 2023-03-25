import chatIcon from "../../assets/chat.png";

import "./login.scss";

export default function Login() {
  return (
    <div className="login-wrapper">
      <div className="login-img">
        <img src={chatIcon} alt="logo" />
      </div>
      <h2 className="logo-title">ColdBurnChat</h2>
      <div className="login-container">
        <div className="displayname-field">
          <label htmlFor="InputField">Display Name</label>
          <input
            type="text"
            name="displayName"
            id="InputField"
            placeholder="Enter a name"
          />
        </div>
        <button className="login-btn" type="button">
          anonymous login
        </button>
      </div>
    </div>
  );
}
