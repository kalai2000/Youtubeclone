import React, { useEffect, useState } from "react";
import "./style2.css";
import Card from "../components/card.jsx";
import Filterbar from "../components/filterbar";
import axios from "axios";
import { BASEURL } from "../config";

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
 

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        let endpoint = `${BASEURL}/api/videos/${type}`; // not going to make use of this type
        if (selectedFilter !== "All") //  by default all videos will be selected
         {
          endpoint = `${BASEURL}/api/videos/tags?tags=${selectedFilter}`;
        }

        const res = await axios.get(endpoint, {
          withCredentials: true,
        });

        setVideos(res.data);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };

    fetchVideos();
  }, [type, selectedFilter]);

  return (
 
    <>


    <Filterbar className="filterbar" onFilterSelect={setSelectedFilter} />
    <div className="Homepage">
      
     
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
       
      
    </div>
    </>
  );
};

export default Home;
