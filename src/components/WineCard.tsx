import React from "react";
import { Wine } from "../types/Wine";
import "./WineCard.css";

interface WineCardProps {
  wine: Wine;
}

const WineCard: React.FC<WineCardProps> = ({ wine }) => {
  const defaultImage = "https://via.placeholder.com/300x400?text=Wine";

  return (
    <div
      className="card"
      style={{
        backgroundImage: `url(${wine.image || defaultImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="card-fill-layer" />

      <div className="card-rating" title={`Rating: ${wine.rating.average}`}>
        <i className="fas fa-star"></i> {wine.rating.average}
      </div>

      <div className="card-overlay">
        <h2 className="card-title" title={wine.wine}>
          {wine.wine}
        </h2>

        {/* Wine Type Icon */}

        <div className="card-details">
        🍷 {wine.type} Wine
          <p className="card-winery" title={wine.winery}> 
            🍇 {wine.winery}
          </p>
          <p className="card-location" title={wine.location}>
            <i className="fas fa-map-marker-alt"></i> {wine.location}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WineCard;
