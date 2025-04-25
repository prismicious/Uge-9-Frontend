import { useState, useEffect } from "react";
import { Wine } from "..
/types/Wine";
import { WineEndpoints, endpointToDisplayName } from "../types/enums";
import useFetch from "./useFetch";

const WINE_API_URL = "https://api.sampleapis.com/wines/";

export const useWineData = () => {
  const [wineType, setWineType] = useState<WineEndpoints>(WineEndpoints.reds);
  const [filteredData, setFilteredData] = useState<Wine[]>([]);
  const [filterCriteria, setFilterCriteria] = useState("wine");
  const [filterValue, setFilterValue] = useState("");
  const [allWines, setAllWines] = useState<Wine[]>([]);
  const [loadingAllWines, setLoadingAllWines] = useState(false);
  const [showAllWines, setShowAllWines] = useState(false);

  const { data, loading, error } = useFetch<Wine[]>(`${WINE_API_URL}/${wineType}`);

  const fetchAllWines = async () => {
    try {
      setLoadingAllWines(true);
      const endpoints = Object.values(WineEndpoints);
      
      const results = await Promise.all(
        endpoints.map(async (endpoint) => {
          const response = await fetch(`${WINE_API_URL}/${endpoint}`);
          const wines = await response.json();
          return wines.map((wine: Wine) => ({ 
            ...wine, 
            type: endpointToDisplayName[endpoint as WineEndpoints] 
          }));
        })
      );
      
      setAllWines(results.flat());
      setShowAllWines(true);
    } catch (error) {
      console.error("Error fetching all wines:", error);
      // Optionally handle the error state here
    } finally {
      setLoadingAllWines(false);
    }
  };

  useEffect(() => {
    const dataToFilter = showAllWines
      ? allWines
      : data?.map((wine) => ({ ...wine, type: endpointToDisplayName[wineType] })) || [];

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
  }, [data, allWines, showAllWines, filterCriteria, filterValue, wineType]);

  return {
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
  };
};