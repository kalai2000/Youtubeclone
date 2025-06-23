import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../css/comments.css";
import Comment from "./comment.jsx";
  import { BASEURL } from "../config";

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
 
  const navigate = useNavigate();


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${BASEURL}/api/comments/${videoId}`);   // get the comments that are related to the video
        setComments(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching comments:", err);
        setComments([]);
      }
    };
    fetchComments();
  }, [videoId]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(
        `${BASEURL}/api/comments/`,
        {
          videoId,
          desc: newComment,
          userId: currentUser._id,
        },
        { withCredentials: true }
      );
      setComments([...comments, res.data]);
      setNewComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };


  // function to delete the comment 
  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(`${BASEURL}/api/comments/${commentId}`, {
        withCredentials: true,
      });
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };


  // function to update the comment 
  const handleCommentUpdate = async (commentId, updatedText) => {
    try {
      const res = await axios.patch(
        `${BASEURL}/api/comments/${commentId}`,
        { desc: updatedText },
        { withCredentials: true }
      );
      setComments(
        comments.map((c) =>
          c._id === commentId ? { ...c, desc: res.data.desc } : c
        )
      );
    } catch (err) {
      console.error("Error updating comment:", err);
    }
  };

  const channelId = Cookies.get("channelId") || currentUser?._id;

  return (
    <div className="comments-container">
      
      <div className="new-comment">
        <img
          src={
            currentUser?.img
              ? `${BASEURL}${encodeURI(currentUser.img)}`
              : "/default-avatar.png"
          }
          alt="User avatar"
          className="avatar"
          onClick={() => navigate(`/channel/${channelId}`)}
          style={{ cursor: "pointer" }}
        />
        <input
          className="comment-input"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit()}
        />
        <button onClick={handleCommentSubmit}>Comment</button>
      </div>

      
      <div className="comments-list">
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            currentUserId={currentUser._id}
            onDelete={() => handleCommentDelete(comment._id)}
            onUpdate={(newText) => handleCommentUpdate(comment._id, newText)}
            currentuser= {currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
