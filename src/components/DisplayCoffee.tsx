import React, {useEffect, useState} from "react";
import CoffeeCard from "./CoffeeCard"; // Adjust this path if needed
import useFetch from "../hooks/useFetch"; // Adjust this path if needed
import {Coffee} from "../types/Coffee"; // Adjust this path if needed

const COFFEE_API_URL = "https://api.sampleapis.com/coffee"; // Replace with your actual API URL

const DisplayCoffees: React.FC = () => {
  const [coffeeType, setCoffeeType] = useState<"hot" | "iced">("hot"); // Default to hot coffees
  const {data, loading, error} = useFetch<Coffee[]>(`${COFFEE_API_URL}/${coffeeType}`); // Fetch hot or iced coffee data
  const [filteredData, setFilteredData] = useState<Coffee[]>([]);
  const [filterCriteria, setFilterCriteria] = useState("title"); // Default to 'title'
  const [filterValue, setFilterValue] = useState(""); // Value for text-based filters
  const [priceLimit, setPriceLimit] = useState(5); // Value for price-based filtering

  // Filter options for dropdown
  const filterOptions = [
    {value: "title", label: "Title"},
    {value: "price", label: "Price"},
    {value: "totalSales", label: "Total Sales"},
    {value: "description", label: "Description"},
    {value: "ingredients", label: "Ingredients"},
  ];

  // Set filtered data whenever the filter criteria, value, or data changes
  useEffect(() => {
    if (data) {
      let filtered = data;

      if (filterCriteria === "price") {
        // Filter based on price limit when 'price' is selected
        filtered = data.filter((coffee) => coffee.price <= priceLimit);
      } else if (filterValue.trim()) {
        // Apply text-based filters for other criteria
        filtered = data.filter((coffee) => {
          if (filterCriteria === "title") {
            return coffee.title.toLowerCase().includes(filterValue.toLowerCase());
          }
          if (filterCriteria === "totalSales") {
            return coffee.totalSales >= parseInt(filterValue); // Example: filter by totalSales >= input value
          }
          if (filterCriteria === "description") {
            return coffee.description
              .toLowerCase()
              .includes(filterValue.toLowerCase());
          }
          if (filterCriteria === "ingredients") {
            return coffee.ingredients.some((ingredient) =>
              ingredient.toLowerCase().includes(filterValue.toLowerCase())
            );
          }
          return true; // Default (no filter)
        });
      }

      setFilteredData(filtered);
    }
  }, [data, filterCriteria, filterValue, priceLimit]);

  if (loading) return <p>Loading coffee data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* Toggle Coffee Type */}
      <div style={{marginBottom: "1rem", textAlign: "center"}}>
        <button
          onClick={() => setCoffeeType(coffeeType === "hot" ? "iced" : "hot")}
          style={{
            padding: "0.5rem 1rem",
            cursor: "pointer",
            border: "none",
            borderRadius: "8px",
            background: "#00704a",
            color: "#ffffff",
            fontSize: "1rem",
            fontWeight: "bold",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#005a3a")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#00704a")}
        >
          Show {coffeeType === "hot" ? "Iced" : "Hot"} Coffees
        </button>
      </div>

      {/* Filter Controls */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "2rem",
          gap: "1rem",
        }}
      >
        {/* Dropdown for Filter Criteria */}
        <select
          value={filterCriteria}
          onChange={(e) => setFilterCriteria(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            minWidth: "200px",
          }}
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Conditional Filter Input Based on Criteria */}
        {filterCriteria === "price" ? (
          // Slider for Price Filtering
          <div style={{textAlign: "center"}}>
            <label
              htmlFor="price-slider"
              style={{display: "block", fontSize: "1rem", marginBottom: "0.5rem"}}
            >
              Filter by Price: Up to ${priceLimit}
            </label>
            <input
              id="price-slider"
              type="range"
              min="1"
              max="5"
              step="0.1"
              value={priceLimit}
              onChange={(e) => setPriceLimit(Number(e.target.value))}
              style={{width: "100%", maxWidth: "300px"}}
            />
          </div>
        ) : (
          // Text Input for Other Filters
          <input
            type="text"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            placeholder={`Enter filter value for ${filterCriteria}...`}
            style={{
              padding: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              width: "100%",
              maxWidth: "300px",
            }}
          />
        )}
      </div>

      {/* Display Filtered Coffees */}
      <div style={{display: "flex", flexWrap: "wrap", gap: "1rem"}}>
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee}/>
          ))
        ) : (
          <p>No coffee items available for the selected filter.</p>
        )}
      </div>
    </div>
  );
};

export default DisplayCoffees;