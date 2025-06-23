import React, { useState } from "react";
import axios from "axios";
import "../css/editVideo.css";  

const EditVideo = ({ video, onClose, onUpdate }) => {
  const [title, setTitle] = useState(video.title);
  const [desc, setDesc] = useState(video.desc);
  const [tags, setTags] = useState(video.tags.join(","));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:8800/api/videos/${video._id}`,
        {
          title,
          desc,
          tags: tags.split(",").map(tag => tag.trim())
        },
        { withCredentials: true }
      );

      alert("Video updated successfully!");
      onUpdate(res.data);  
      onClose();  
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      alert("Failed to update video");
    }
  };


  // contanier to input data 
  return (
    <div className="edit-video-modal">
      <div className="edit-video-form">
        <h2>Edit Video</h2>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" />
        <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (comma-separated)" />
        <div className="buttons">
          <button onClick={handleSubmit}>Update</button>
          <button onClick={onClose} className="cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditVideo;
