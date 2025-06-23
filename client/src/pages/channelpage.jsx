import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Card from "../components/card";
import EditVideo from "../components/editvideo";
import "./Channel.css";
import { useSelector } from "react-redux";
import { BASEURL } from "../config";

const ChannelPage = () => {
  const navigate = useNavigate();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [channelId, setChannelId] = useState("");
  const [editingVideo, setEditingVideo] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);
 

  useEffect(() => {
    const storedChannelId = Cookies.get("channelId") || "";
    if (!storedChannelId) {
      console.warn("Channel ID missing! Redirecting...");
      navigate("/");
    }
    setChannelId(storedChannelId);
  }, [navigate]);

  useEffect(() => {
    if (!channelId) return;

    const fetchChannelData = async () => {
      try {
        const res = await axios.get(`${BASEURL}/api/channels/${channelId}`, {
          withCredentials: true,
        });
        setChannel(res.data);
       
      } catch (err) {
        console.error("Error fetching channel:", err.response?.data || err.message);
      }
    };

    const fetchChannelVideos = async () => {
      try {
        const res = await axios.get(`${BASEURL}/api/videos/byChannel/${channelId}`, {
          withCredentials: true,
        });
        setVideos(res.data);
      } catch (err) {
        console.error("Error fetching channel videos:", err.response?.data || err.message);
      }
    };

    fetchChannelData();
    fetchChannelVideos();
  }, [channelId]);

  const handleDelete = async (videoId) => {
    try {
      await axios.delete(`${BASEURL}/api/videos/${videoId}`, {
        withCredentials: true,
      });

      setVideos((prev) => prev.filter((video) => video._id !== videoId));
      alert("Video deleted successfully!");
    } catch (err) {
      console.error("Failed to delete video:", err.response?.data || err.message);
    }
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
  };

  const handleUpdate = (updatedVideo) => {
    setVideos((prev) =>
      prev.map((v) => (v._id === updatedVideo._id ? updatedVideo : v))
    );
    setEditingVideo(null);
  };

  if (!channel) return <div className="loading">Loading channel...</div>;

  return (
    <div className="channel-page">
      <div className="channel-header">
        <img
          src={
            channel?.channelBanner
              ? `${BASEURL}/uploads/${encodeURIComponent(channel.channelBanner)}`
              : "/default-avatar.png"
          }
          alt="Channel"
          className="channel-avatar"
        />

        <div className="channel-info">
          <h1 className="channel-name">{channel.channelName}</h1>
          <p className="channel-subscribers">{channel.subscribers} subscribers</p>
          <p className="channel-description">{channel.description}</p>
        </div>
      </div>

      {currentUser && currentUser._id === channel.owner && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const file = e.target.elements.banner.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("banner", file);

            try {
              await axios.post(`${BASEURL}/api/channels/uploadBanner`, formData, {
                withCredentials: true,
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
              window.location.reload();
            } catch (err) {
              console.error("Upload failed", err.response?.data || err.message);
            }
          }}
        >
          <input type="file" name="banner" accept="image/*" />
          <button type="submit">Upload Banner</button>
        </form>
      )}

      <div className="channel-videos">
        <h2 className="video-section-title">Videos</h2>
        <div className="video-grid">
          {videos.length > 0 ? (
            videos.map((video) => (
              <Card
                key={video._id}
                video={video}
                isOwnerView={currentUser?._id === channel.owner}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <p className="no-videos">No videos available for this channel.</p>
          )}
        </div>
      </div>

      {editingVideo && (
        <EditVideo
          video={editingVideo}
          onClose={() => setEditingVideo(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ChannelPage;
