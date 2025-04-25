import React from "react";
import WineCard from "./WineCard";
import { useWineData } from "../hooks/useWineData";
import { WineEndpoints } from "../types/enums";
import "./DisplayWine.css";

const DisplayWines: React.FC = () => {
  const {
    wineType,
    setWineType,
    filteredData,
    filterCriteria,
    setFilterCriteria,
    filterValue,
    setFilterValue,
    showAllWines,
    setShowAllWines,
    fetchAllWines,
    loading,
    loadingAllWines,
    error,
  } = useWineData();

  const toggleWineView = () => {
    if (!showAllWines) {
      fetchAllWines();
    } else {
      setShowAllWines(false);
      setWineType(WineEndpoints.reds);
    }
  };

  if (loading || loadingAllWines) {
    return <p className="status-message">Loading...</p>;
  }

  if (error) {
    return <p className="status-message error-message">Error: {error}</p>;
  }

  return (
    <div className="wine-display-container">
      <span className="filter-count">
        Showing {filteredData.length} wine{filteredData.length === 1 ? "" : "s"}
      </span>
      <div className="wine-controls">
        <button onClick={toggleWineView} className="toggle-button effects">
          {showAllWines ? "Show Specific Wine Type" : "Show All Wines"}
        </button>
        {!showAllWines && (
          <select
            value={wineType}
            onChange={(e) => setWineType(e.target.value as WineEndpoints)}
            className="wine-type-selector effects"
          >
            <option value={WineEndpoints.reds}>Reds</option>
            <option value={WineEndpoints.whites}>Whites</option>
            <option value={WineEndpoints.rose}>Rose</option>
            <option value={WineEndpoints.sparkling}>Sparkling</option>
            <option value={WineEndpoints.dessert}>Dessert</option>
            <option value={WineEndpoints.port}>Port</option>
          </select>
        )}
      </div>
      <div className="filter-container">
        <select
          value={filterCriteria}
          onChange={(e) => setFilterCriteria(e.target.value)}
          className="filter-dropdown effects"
        >
          <option value="wine">Title</option>
          <option value="winery">Winery</option>
          <option value="location">Location</option>
          <option value="type">Wine Type</option>
        </select>
        <input
          type="text"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder={`Enter filter value for ${filterCriteria}...`}
          className="filter-input effects"
        />
      </div>
      <div className="cards-container">
        {filteredData.length > 0 ? (
          filteredData.map((wine) => <WineCard key={wine.id} wine={wine} />)
        ) : (
          <p className="status-message">No wine items available for the selected filter.</p>
        )}
      </div>
    </div>
  );
};

export default DisplayWines;
