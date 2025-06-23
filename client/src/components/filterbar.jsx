import React from "react";
import "../css/filterbar.css";

const filters = [
  "All", "fun", "news", "logic", "entertainment",
  "sports", "god",  
];

const Filterbar = ({ onFilterSelect }) => {
  return (
    <div className="filter-bar">
      <div className="filter-wrapper">
        {filters.map((filter, index) => (
          <button
            key={index}
            className="filter-button"
            onClick={() => onFilterSelect(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filterbar;

