import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import UploadIcon from '@mui/icons-material/Upload';
import axios from "axios";
import Cookies from "js-cookie";
import "../css/navbar.css";
import { BASEURL } from "../config";

const Navbar = ({ darkMode, setDarkMode, menuExpanded, setMenuExpanded }) => {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const { currentUser } = useSelector((state) => state.user);
 
 

  // search the qesry when enter key is pressed 
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?q=${q}`);
    }
  };

  const handleCreateChannel = async () => {
    if (!currentUser) {
      console.error("User is not authenticated.");
      return;
    }

    try {
      const res = await axios.post(
        "${BASEURL}/api/channels",
        { channelName: `${currentUser.name}'s Channel` },
        { withCredentials: true }
      );

      Cookies.set("channelId", res.data._id, { expires: 7 });
      navigate(`/channel/${res.data._id}`);
    } catch (error) {
      console.error("Error creating channel:", error.response?.data || error.message);
    }
  };

  return (
    <div className="wrapper-navbar">
      {/* Left Section: Menu Icon + Logo */}
      <div className="navbar-left">
        <MenuIcon
          onClick={() => setMenuExpanded(!menuExpanded)}
          style={{ cursor: "pointer", color: "white", marginLeft: "10px" }}
        />
        <div className="logo" onClick={() => navigate("/")}>
          <img src="/youtubelogo.png" alt="YouTube" className="logo-img" />
          <span className="logo-text">YouTube</span>
        </div>
      </div>

      {/* Middle Section: Search Bar */}
      <div className="search">
        <input
          type="text"
          placeholder="Search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyPress={handleKeyPress}
          aria-label="Search input"
        />
        <SearchOutlinedIcon
          onClick={() => navigate(`/search?q=${q}`)}
          aria-label="Search"
          style={{ cursor: "pointer", color: "white", backgroundColor: "#222222" }}
        />
      </div>

      {/* Right Section: User Actions */}
      <div className="signin">
        {currentUser ? (
          <div className="user-info">
            <Link to="/upload">
              <button className="button"><UploadIcon/></button>
            </Link>
            <img
              src={
                currentUser?.img
                  ? `${BASEURL}${encodeURI(currentUser.img)}`
                  : "/default-avatar.png"
              }
              alt="User avatar"
              className="avatar"
              onClick={() => navigate(`/channel/${Cookies.get("channelId")}`)}
              style={{ cursor: "pointer" }}
            />
             

            {!Cookies.get("channelId") && (
              <button className="button" onClick={handleCreateChannel}>
                Create Channel
              </button>
            )}

            
          </div>
        ) : (
          <Link to="/signin" className="button">
            <AccountCircleOutlinedIcon />
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
