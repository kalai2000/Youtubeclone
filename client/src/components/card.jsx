import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import "../css/card.css";

const Card = ({ type, video, isOwnerView = false, onDelete = () => {}, onEdit = () => {} }) => {
  const [channel, setChannel] = useState({});     

  useEffect(() => {
    const fetchChannel = async () => {
      if (!video?.channelId) return;
      try {
        const res = await axios.get(`/api/channels/${video.channelId}`);
        setChannel(res.data);
      } catch (err) {
        console.error("  Failed to fetch channel:", err);
      }
    };

    fetchChannel();
  }, [video?.channelId]);

  if (!video) return null;


  // image url for video icon
  const bannerSrc =
    channel.channelBanner && channel.channelBanner.trim() !== ""
      ? `http://localhost:8800/uploads/${encodeURIComponent(channel.channelBanner.replace(/\\/g, "/"))}`
      : "/default-avatar.jpg";


  // image url for video thumbnail
  const thumbnailSrc =
    video.imgurl && video.imgurl.trim() !== ""
      ? `http://localhost:8800/${video.imgurl.replace(/\\/g, "/")}`
      : "/default-avatar.jpg";
  
  
  // function to delete  
  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this video?")) {
      onDelete(video._id);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    onEdit(video);
  };

  return (
    <div className={`card-container ${type === "sm" ? "sm" : ""}`}>
      <Link to={`/video/${video._id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div className="card-inner">
          <div className="thumbnail-wrapper">
            <img
              className={`card-image ${type === "sm" ? "sm" : ""}`}
              src={thumbnailSrc}
              alt="thumbnail"
            />
            <span className="video-duration">6:20</span>
          </div>

          <div className={`card-details ${type === "sm" ? "sm" : ""}`}>
            {type !== "sm" && (
              <img className="card-channel-image" src={bannerSrc} alt="channel" />
            )}

            <div className="card-texts">
              <h1 className="card-title">{video.title}</h1>
              <h2 className="card-channel-name">{channel.channelName || "Unknown Channel"}</h2>
              <div className="card-info">
                {video.views} views • {format(video.createdAt)}
              </div>
            </div>
          </div>
        </div>
      </Link>
      
    {/* this content will be diplayed only if the user is signed in */}
      {isOwnerView && (
        <div className="card-menu">
          <button onClick={handleEdit} className="menu-item-card">Edit</button>
          <button onClick={handleDelete} className="menu-item-card">Delete</button>
        </div>
      )}
    </div>
  );
};

export default Card;
