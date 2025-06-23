 
// export default Video;
import React, { useEffect, useState } from "react";
import {
  ThumbUpOutlined,
  ThumbDownOffAltOutlined,
  ReplyOutlined,
  AddTaskOutlined,
  ThumbUp,
  ThumbDown,
} from "@mui/icons-material";
import Comments from "../components/comments";
import Recommendation from "../components/Recommendation";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";
import { format } from "timeago.js";
import "./video.css";
  import { BASEURL } from "../config";

 

const Video = () => {
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];

  const currentUser = useSelector((state) => state.user?.currentUser);
  const currentVideo = useSelector((state) => state.video?.currentVideo);

  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`${BASEURL}/api/videos/find/${path}`, {
          withCredentials: true,
        });

        const channelRes = await axios.get(`${BASEURL}/api/channels/${videoRes.data.channelId}`, {
          withCredentials: true,
        });
        await axios.put(`${BASEURL}/api/videos/view/${path}`);

        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {
        console.error("Error fetching video or channel:", err);
      }
    };

    if (path) fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    try {
      await axios.put(
        `${BASEURL}/api/users/like/${currentVideo._id}`,
        {},
        { withCredentials: true }
      );
      dispatch(like(currentUser?._id));
    } catch (err) {
      console.error("Error liking video", err);
    }
  };

  const handleDislike = async () => {
    try {
      await axios.put(
        `${BASEURL}/api/users/dislike/${currentVideo._id}`,
        {},
        { withCredentials: true }
      );
      dispatch(dislike(currentUser?._id));
    } catch (err) {
      console.error("Error disliking video", err);
    }
  };

  const handleSub = async () => {
    try {
      if (!channel || !currentUser) return;

      const isSubscribed = currentUser.subscribedChannels?.includes(channel._id);
      const url = isSubscribed
        ? `${BASEURL}/api/users/unsub/${channel._id}`
        : `${BASEURL}/api/users/sub/${channel._id}`;

      await axios.put(url, {}, { withCredentials: true });
      dispatch(subscription(channel._id));
    } catch (err) {
      console.error("Error subscribing/unsubscribing", err);
    }
  };

  if (!currentVideo || !channel) return <div>Loading...</div>;

  return (
    <div className="video-container">
      <div className="content">
        <div className="videoWrapper">
          <video
            className="videoFrame"
            controls
            preload="auto"
            src={`${BASEURL}/${currentVideo.videourl}`}
          />
        </div>

        <h1 className="title">{currentVideo.title}</h1>
        <div className="details">
          <span className="info">
            {currentVideo.views} views • {format(currentVideo.createdAt)}
          </span>
          <div className="buttons">
            <div className="button" onClick={handleLike}>
              {currentVideo.likes?.includes(currentUser?._id) ? <ThumbUp /> : <ThumbUpOutlined />}
              {currentVideo.likes?.length}
            </div>
            <div className="button" onClick={handleDislike}>
              {currentVideo.dislikes?.includes(currentUser?._id) ? (
                <ThumbDown />
              ) : (
                <ThumbDownOffAltOutlined />
              )}
              Dislike
            </div>
            <div className="button">
              <ReplyOutlined /> Share
            </div>
            <div className="button">
              <AddTaskOutlined /> Save
            </div>
          </div>
        </div>
        <hr className="hr" />
        <div className="channel">
          <div className="channelInfo">
            <img
              className="image"
              alt="channel"
              src={
                channel?.channelBanner
                  ? `${BASEURL}/uploads/${encodeURIComponent(
                      channel.channelBanner.trim().replace(/\\/g, "/")
                    )}`
                  : "/default-avatar.jpg"
              }
            />
            <div className="channelDetail">
              <span className="channelName">{channel.channelName}</span>
              <span className="channelCounter">{channel.subscribers} subscribers</span>
              <p className="description">{currentVideo.desc}</p>
            </div>
          </div>
          <button className="subscribe" onClick={handleSub}>
            {currentUser?.subscribedChannels?.includes(channel?._id) ? "SUBSCRIBED" : "SUBSCRIBE"}
          </button>
        </div>
        <hr className="hr" />
        <Comments videoId={currentVideo._id} />
      </div>
      <Recommendation tags={currentVideo.tags} />
    </div>
  );
};

export default Video;
