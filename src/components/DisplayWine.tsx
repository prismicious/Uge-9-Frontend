import React, { useEffect, useState } from "react";
import WineCard from "./WineCard";
import useFetch from "../hooks/useFetch";
import { Wine } from "../types/Wine";
import { WineEndpoints, WineType } from "../types/enums";
import "./DisplayWine.css";

const WINE_API_URL = "https://api.sampleapis.com/wines/";

const DisplayWines: React.FC = () => {
  const [wineType, setWineType] = useState<WineEndpoints>(WineEndpoints.reds);
  const { data, loading, error } = useFetch<Wine[]>(
    `${WINE_API_URL}/${wineType}`
  );
  const [filteredData, setFilteredData] = useState<Wine[]>([]);
  const [filterCriteria, setFilterCriteria] = useState("wine");
  const [filterValue, setFilterValue] = useState("");

  const [allWines, setAllWines] = useState<Wine[]>([]);
  const [loadingAllWines, setLoadingAllWines] = useState(false);
  const [showAllWines, setShowAllWines] = useState(false);

  const redWines = useFetch<Wine[]>(`${WINE_API_URL}/${WineEndpoints.reds}`);
  const whiteWines = useFetch<Wine[]>(
    `${WINE_API_URL}/${WineEndpoints.whites}`
  );
  const roseWines = useFetch<Wine[]>(`${WINE_API_URL}/${WineEndpoints.roses}`);
  const sparklingWines = useFetch<Wine[]>(
    `${WINE_API_URL}/${WineEndpoints.sparkling}`
  );
  const dessertWines = useFetch<Wine[]>(
    `${WINE_API_URL}/${WineEndpoints.dessert}`
  );
  const portWines = useFetch<Wine[]>(`${WINE_API_URL}/${WineEndpoints.port}`);

  const fetchAllWines = () => {
    setLoadingAllWines(true);

    const allWineData = [
      redWines.data?.map((wine) => ({ ...wine, type: WineType.Red })) || [],
      whiteWines.data?.map((wine) => ({ ...wine, type: WineType.White })) || [],
      roseWines.data?.map((wine) => ({ ...wine, type: WineType.Rose })) || [],
      sparklingWines.data?.map((wine) => ({
        ...wine,
        type: WineType.Sparkling,
      })) || [],
      dessertWines.data?.map((wine) => ({ ...wine, type: WineType.Dessert })) ||
        [],
      portWines.data?.map((wine) => ({ ...wine, type: WineType.Port })) || [],
    ];

    const combinedWines = allWineData.flat();
    setAllWines(combinedWines);
    setShowAllWines(true);
    setLoadingAllWines(false);
  };

  const filterOptions = [
    { value: "wine", label: "Title" },
    { value: "winery", label: "Winery" },
    { value: "location", label: "Location" },
    { value: "type", label: "Wine Type" },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const mapEndpointToType: Record<WineEndpoints, WineType> = {
    reds: WineType.Red,
    whites: WineType.White,
    rose: WineType.Rose,
    sparkling: WineType.Sparkling,
    dessert: WineType.Dessert,
    port: WineType.Port,
  };

  useEffect(() => {
    const dataToFilter = showAllWines
      ? allWines
      : data?.map((wine) => ({ ...wine, type: mapEndpointToType[wineType] })) ||
        [];

    if (dataToFilter) {
      let filtered = dataToFilter;

      if (filterValue.trim()) {
        const searchValue = filterValue.toLowerCase();
        filtered = dataToFilter.filter((wine) => {
          if (filterCriteria === "wine") {
            return wine.wine.toLowerCase().includes(searchValue);
          }
          if (filterCriteria === "winery") {
            return wine.winery.toLowerCase().includes(searchValue);
          }
          if (filterCriteria === "location") {
            return wine.location.toLowerCase().includes(searchValue);
          }
          if (filterCriteria === "type" && wine.type) {
            return wine.type.toLowerCase().includes(searchValue);
          }
          return true;
        });
      }

      setFilteredData(filtered);
    }
  }, [
    data,
    allWines,
    showAllWines,
    filterCriteria,
    filterValue,
    wineType,
    mapEndpointToType,
  ]);

  const toggleWineView = () => {
    if (showAllWines) {
      setShowAllWines(false);
    } else {
      fetchAllWines();
    }
  };

  const changeWineType = (newType: WineEndpoints) => {
    setWineType(newType);
    setShowAllWines(false);
  };

  if (loading && !showAllWines) {
    return (
      <div className="wine-display-container">
        <p className="status-message">Loading wine data...</p>
      </div>
    );
  }

  if (loadingAllWines) {
    return (
      <div className="wine-display-container">
        <p className="status-message">Loading all wines...</p>
      </div>
    );
  }

  if (error && !showAllWines) {
    return (
      <div className="wine-display-container">
        <p className="status-message error-message">Error: {error}</p>
      </div>
    );
  }

  const enrichedData =
    data?.map((wine) => ({
      ...wine,
      type: mapEndpointToType[wineType],
    })) || [];

  const displayData =
    filteredData.length > 0
      ? filteredData
      : showAllWines
      ? allWines
      : enrichedData;

  return (
    <div className="wine-display-container">
      {" "}
      <span className="filter-count">
        Showing {displayData.length} wine{displayData.length === 1 ? "" : "s"}
      </span>
      <div className="wine-controls">
        <button onClick={toggleWineView} className="toggle-button">
          {showAllWines ? "Show Specific Wine Type" : "Show All Wines"}
        </button>

        {!showAllWines && (
          <select
            value={wineType}
            onChange={(e) => changeWineType(e.target.value as WineEndpoints)}
            className="wine-type-selector"
          >
            {Object.entries(WineEndpoints).map(([key, value]) => (
              <option key={key} value={value}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="filter-container">
        <select
          value={filterCriteria}
          onChange={(e) => setFilterCriteria(e.target.value)}
          className="filter-dropdown"
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder={`Enter filter value for ${filterCriteria}...`}
          className="filter-input"
        />
      </div>
      <div className="cards-container">
        {displayData.length > 0 ? (
          displayData.map((wine) => <WineCard key={wine.id} wine={wine} />)
        ) : (
          <p className="status-message">
            No wine items available for the selected filter.
          </p>
        )}
      </div>
    </div>
  );
};

export default DisplayWines;
