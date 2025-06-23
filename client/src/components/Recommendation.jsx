import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./card";
import "./style.css";
import { BASEURL } from "../config";

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        

        const res = await axios.get(`${BASEURL}/api/videos/tags?tags=${tags}`);
         

        if (Array.isArray(res.data)) {
           
          setVideos(res.data);
        } else {
          console.warn("  API response is not an array:", res.data);
        }
      } catch (err) {
        console.error("  Failed to fetch recommended videos:", err);
      }
    };

    if (tags?.length > 0) {
      fetchVideos();
    }
  }, [JSON.stringify(tags)]);    // we are comparing the tags as strings so useeffect does not run multiple times unnecessarily

  return (
    <div className="recommendationContainer">
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />  // passsing the sm tag so that the styles kickin 
      ))}
    </div>
  );
};

export default Recommendation;
