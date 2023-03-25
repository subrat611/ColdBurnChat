import { useState } from "react";
import {
  createUserInformationInFireStore,
  signInAnonymouslyWithFirebase,
} from "../../firebase";

import { useStateValue } from "../context/User";

import chatIcon from "../../assets/chat.png";
import "./login.scss";

export default function Login() {
  const [displayName, setDisplayname] = useState("");
  const [state, _] = useStateValue();

  const handleLogin = async () => {
    if (displayName !== "") {
      const { user } = await signInAnonymouslyWithFirebase();

      if (!state.user) {
        await createUserInformationInFireStore(
          "users",
          user.uid,
          displayName,
          "online"
        );
      }
    } else alert("Please enter a display name");
  };

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
            value={displayName}
            onChange={(e) => setDisplayname(e.target.value)}
          />
        </div>
        <button className="login-btn" type="button" onClick={handleLogin}>
          anonymous login
        </button>
      </div>
    </div>
  );
}
