 
// export default App;
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";

import Menu from "./components/menu";
import Navbar from "./components/navigation";
import Upload from "./components/upload";
import Home from "./pages/homepage";
import Video from "./pages/videopage";
import SignIn from "./pages/signin";
import Search from "./pages/Search";
import ChannelPage from "./pages/channelpage";
 

function AppLayout() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuExpanded, setMenuExpanded] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  const isVideoPage = location.pathname.startsWith("/video/");

  return (
    <div className={`app-container ${darkMode ? "dark-theme" : "light-theme"}`}>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        menuExpanded={menuExpanded}
        setMenuExpanded={setMenuExpanded}
      />
      
      <div className={`page-layout ${!isVideoPage && menuExpanded ? "with-menu" : ""}`}>
        <Menu
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          expanded={menuExpanded}
          // hiddenByRoute={isVideoPage}
        />

        <div className="content-area">
          <Routes>
            <Route path="/" element={<Home type="random" />} />
            <Route path="/trends" element={<Home type="trend" />} />
            <Route path="/subscriptions" element={<Home type="sub" />} />
            <Route path="/search" element={<Search />} />
            <Route
              path="/signin"
              element={currentUser ? <Home /> : <SignIn />}
            />
            <Route path="/video/:id" element={<Video />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/channel/:channelId" element={<ChannelPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
