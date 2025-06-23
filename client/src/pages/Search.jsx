import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/card";
import "./style2.css";
  import { BASEURL } from "../config";

const Search = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);          
  const [error, setError] = useState(null);              

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q");
  

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${BASEURL}/api/videos/search?q=${searchQuery}`);
        setVideos(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) fetchVideos();
  }, [searchQuery]);

  return (
    <div className="search-container">
      {loading && <p className="status-message">Loading search results...</p>}

      {!loading && error && (
        <p className="status-message error">{error}</p>
      )}

      {!loading && !error && videos.length === 0 && (
        <p className="status-message">No videos found for "<strong>{searchQuery}</strong>"</p>
      )}

      {!loading && !error && videos.length > 0 && (
        videos.map((video) => <Card key={video._id} video={video} />)
      )}
    </div>
  );
};

export default Search;
