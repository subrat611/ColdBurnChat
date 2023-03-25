import { Routes, Route } from "react-router-dom";

import { useStateValue } from "./components/context/User";

import Login from "./components/Login";
import SideBar from "./components/SideBar";
import MainChatSection from "./components/MainChatSection";

import "./app.scss";

function App() {
  const [state, _] = useStateValue();

  return (
    <div className="app_wrapper">
      {!state.user ? (
        <Login />
      ) : (
        <div className="app_container">
          <Routes>
            <Route path="/" element={<SideBar />}>
              <Route path="/rooms/:roomId" element={<MainChatSection />} />
            </Route>
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
