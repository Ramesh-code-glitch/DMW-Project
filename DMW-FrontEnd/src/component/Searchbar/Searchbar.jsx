import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Search.css"; // Import the corresponding CSS file

const Search = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    setError(""); // Reset error message
    try {
      const response = await axios.get("http://localhost:3001/api/parts/search", {
        params: {
          make,
          model,
          year,
        },
      });
      // Navigate to ResultsPage with search results
      navigate("/results", { state: { results: response.data, make, model, year } });
    } catch (error) {
      console.error("Error fetching parts:", error);
      setError(
        error.response?.data?.message || "Could not fetch parts. Please try again later."
      );
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  // Clear results if the user changes the search criteria
  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  return (
    <div className="search-bar-container"> {/* Use correct class name here */}
      <div className="dropdown-container">
        <h3>
          Don't Get Hassle <br />
          Search Your Part Here
        </h3>

        <select value={make} onChange={handleChange(setMake)} className="dropdown">
          <option value="">Select Make</option>
          <option value="TATA">TATA</option>
          <option value="HONDA">HONDA</option>
          <option value="SUZUKI">SUZUKI</option>
          <option value="TOYOTA">TOYOTA</option>
          <option value="MAHINDRA">MAHINDRA</option>
        </select>

        <select value={model} onChange={handleChange(setModel)} className="dropdown">
          <option value="">Select Model</option>
          <option value="SAFARI">SAFARI</option>
          <option value="SWIFT">SWIFT</option>
          <option value="MOBILIO">MOBILIO</option>
          <option value="INNOVA">INNOVA</option>
          <option value="BOLERO">BOLERO</option>
        </select>

        <select value={year} onChange={handleChange(setYear)} className="dropdown">
          <option value="">Select Year</option>
          <option value="2010">2010</option>
          <option value="2011">2011</option>
          <option value="2012">2012</option>
          <option value="2013">2013</option>
          <option value="2014">2014</option>
        </select>

        <button
          className="search-button"
          onClick={handleSearch}
          disabled={loading || !make || !model || !year} // Disable if loading or any field is empty
        >
          {loading ? "Searching..." : "Help To Search My Part"}
        </button>
      </div>

      <div className="search-results">
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      <div className="user-search-footer">
        <span>100% Genuine Used Parts</span>
        <div className="rating">
          <img src="/Glogo.png" alt="Genuine Parts Logo" />
        </div>
      </div>
    </div>
  );
};

export default Search;
