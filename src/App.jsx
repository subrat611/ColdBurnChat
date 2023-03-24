import SideBar from "./components/SideBar";
import MainChatSection from "./components/MainChatSection";

import "./app.scss";

function App() {
  return (
    <div className="app_wrapper">
      <div className="app_container">
        <SideBar />
        <MainChatSection />
      </div>
    </div>
  );
}

export default App;
