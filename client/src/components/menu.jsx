import React from "react";
import "../css/Menu.css";
import {
  Home as HomeIcon,
  ExploreOutlined as ExploreOutlinedIcon,
  SubscriptionsOutlined as SubscriptionsOutlinedIcon,
  VideoLibraryOutlined as VideoLibraryOutlinedIcon,
  HistoryOutlined as HistoryOutlinedIcon,
  LibraryMusicOutlined as LibraryMusicOutlinedIcon,
  SportsEsportsOutlined as SportsEsportsOutlinedIcon,
  SportsBasketballOutlined as SportsBasketballOutlinedIcon,
  MovieOutlined as MovieOutlinedIcon,
  ArticleOutlined as ArticleOutlinedIcon,
  LiveTvOutlined as LiveTvOutlinedIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  FlagOutlined as FlagOutlinedIcon,
  HelpOutlineOutlined as HelpOutlineOutlinedIcon,
  SettingsBrightnessOutlined as SettingsBrightnessOutlinedIcon,
} from "@mui/icons-material";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Menu = ({ darkMode, setDarkMode, expanded, hiddenByRoute }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div
      className={`menu-container ${
        hiddenByRoute && !expanded
          ? "menu-hidden"
          : expanded
          ? "menu-visible"
          : "menu-collapsed"
      }`}
    >
      <div className="menu-wrapper">
        {/* Home */}
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="menu-item">
            <HomeIcon />
            {expanded && "Home"}
          </div>
        </Link>

        {/* Explore */}
        <Link to="/trends" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="menu-item">
            <ExploreOutlinedIcon />
            {expanded && "Explore"}
          </div>
        </Link>

        {/* Subscriptions */}
        <Link to="/subscriptions" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="menu-item">
            <SubscriptionsOutlinedIcon />
            {expanded && "Subscriptions"}
          </div>
        </Link>

        {expanded && (
          <>
            <hr className="menu-hr" />

            {/* Library and History */}
            <div className="menu-item">
              <VideoLibraryOutlinedIcon />
              Library
            </div>
            <div className="menu-item">
              <HistoryOutlinedIcon />
              History
            </div>

            <hr className="menu-hr" />

            {/* Categories */}
            <div className="menu-item">
              <LibraryMusicOutlinedIcon />
              Music
            </div>
            <div className="menu-item">
              <SportsBasketballOutlinedIcon />
              Sports
            </div>
            <div className="menu-item">
              <SportsEsportsOutlinedIcon />
              Gaming
            </div>
            <div className="menu-item">
              <MovieOutlinedIcon />
              Movies
            </div>
            <div className="menu-item">
              <ArticleOutlinedIcon />
              News
            </div>
            <div className="menu-item">
              <LiveTvOutlinedIcon />
              Live
            </div>

            <hr className="menu-hr" />

            {/* Settings */}
            <div className="menu-item">
              <SettingsOutlinedIcon />
              Settings
            </div>
            <div className="menu-item">
              <FlagOutlinedIcon />
              Report
            </div>
            <div className="menu-item">
              <HelpOutlineOutlinedIcon />
              Help
            </div>
          </>
        )}

        {/* Theme Toggle */}
        <div className="menu-item" onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {expanded && (darkMode ? "Light" : "Dark") + " Mode"}
        </div>

        {/* Sign In Prompt */}
        {!currentUser && (
          <>
            <hr className="menu-hr" />
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <div className="menu-login">
                <AccountCircleOutlinedIcon />
                {expanded && "Sign in to like videos, comment, and subscribe."}
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
