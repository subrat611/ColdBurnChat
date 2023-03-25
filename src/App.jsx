import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import SideBar from "./components/SideBar";
import MainChatSection from "./components/MainChatSection";

import "./app.scss";

function App() {
  return (
    <div className="app_wrapper">
      {true ? (
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
