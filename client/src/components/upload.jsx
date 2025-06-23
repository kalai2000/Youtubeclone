import React, { useState } from "react";
import axios from "axios";
import "../css/upload.css";

const Upload = () => {
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(",").map(tag => tag.trim())); // trim spaces
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    //   Manual validation
    if (!video || !img || !inputs.title || !inputs.desc || tags.length === 0) {
      alert("  Please fill in all fields and select both a video and an image file.");
      return;
    }

    // Extract token from redux-persist structure
    const token = JSON.parse(localStorage.getItem("persist:root"))?.user
      ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser?.accessToken
      : null;

    const formData = new FormData();
    formData.append("video", video);
    formData.append("img", img);
    formData.append("title", inputs.title);
    formData.append("desc", inputs.desc);
    formData.append("tags", tags.join(","));

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      await axios.post("http://localhost:8800/api/videos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      // Reset form
      setVideo(null);
      setImg(null);
      setInputs({});
      setTags([]);

      alert("  File uploaded successfully!");
    } catch (err) {
      console.error("  Upload failed:", err);
      alert("  Upload failed. Please try again.");
    }
  };

  return (
    <div className="upload-container">
      <h1 className="upload-title">Upload a New Video</h1>

      <label className="upload-label">Video:</label>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideo(e.target.files[0])}
        className="upload-input"
      />

      <input
        type="text"
        placeholder="Title"
        name="title"
        onChange={handleChange}
        className="upload-input"
      />

      <textarea
        placeholder="Description"
        name="desc"
        rows={8}
        onChange={handleChange}
        className="upload-textarea"
      />

      <input
        type="text"
        placeholder="Separate the tags with commas."
        onChange={handleTags}
        className="upload-input"
      />

      <label className="upload-label">Image:</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImg(e.target.files[0])}
        className="upload-input"
      />

      <button className="upload-button" type="submit" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default Upload;
