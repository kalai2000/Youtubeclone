import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/comment.css";
import { BASEURL } from "../config";

const Comment = ({ comment, currentUserId, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.desc);
  const [user, setUser] = useState(null);  


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASEURL}/api/users/find/${comment.userId}`);  // api call to fetch the user details
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    };

    if (comment.userId && typeof comment.userId === "string") {
      fetchUser();
    } else if (typeof comment.userId === "object") {
       
      setUser(comment.userId);
    }
  }, [comment.userId]);


  // once the edited comment is saved below function will be used 
  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(editText);
      setIsEditing(false);
    }
  };

  const isOwner = user?._id === currentUserId || comment.userId === currentUserId;
   


  return (
    <div className="comment-item">
    <img
  src={`${BASEURL}${user?.img?.startsWith("/uploads") ? user.img : "/uploads/" + encodeURIComponent(user?.img || "")}`}
  alt="Avatar"
  className="avatar"
/>
<div className="comment-author">{user?.name || "Unknown User"}</div>
      <div className="comment-body">
        

        {isEditing ? (
          <div className="edit-section">
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <div className="comment-text">{comment.desc}</div>
        )}

        {isOwner && !isEditing && (
          <div className="comment-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={onDelete}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
