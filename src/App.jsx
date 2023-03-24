import { Routes, Route } from "react-router-dom";

import SideBar from "./components/SideBar";
import MainChatSection from "./components/MainChatSection";

import "./app.scss";

function App() {
  return (
    <div className="app_wrapper">
      <div className="app_container">
        <Routes>
          <Route path="/" element={<SideBar />}>
            <Route path="/rooms/:roomId" element={<MainChatSection />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
