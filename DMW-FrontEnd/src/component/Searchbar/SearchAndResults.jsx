import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import './SearchAndResults.css';

const SearchAndResultsPage = () => {
  const location = useLocation();
  const { make, model, year } = location.state || { make: "", model: "", year: "" };

  const [selectedPart, setSelectedPart] = useState("");
  const [selectedPartName, setSelectedPartName] = useState(""); 
  const [selectedParts, setSelectedParts] = useState([]);
  
  const navigate = useNavigate();  // For navigation

  const partsList = [
    { value: "", label: "Type part name e.g belt, light" },
    { value: "17", label: "Brake Disc" },
    { value: "18", label: "Brake Drum" },
    { value: "19", label: "Abs Controller" },
    { value: "20", label: "Abs Hydraulic Unit" },
    { value: "21", label: "Abs Sensor" },
    { value: "22", label: "Master Cylinder" },
    { value: "23", label: "Vacuum Pump" },
    { value: "24", label: "Wheel Cylinder" },
    { value: "25", label: "Brake Servos" },
    { value: "26", label: "Hoses and Pipes" },
    { value: "27", label: "Brake Callipers" },
    { value: "28", label: "Air Cleaner Assy" },
    { value: "29", label: "Air Hoses" },
    { value: "30", label: "Complete Engine" },
    { value: "31", label: "Bare Engine" },
    { value: "32", label: "Cylinder" },
  ];

  const handlePartChange = (event) => {
    const selectedValue = event.target.value;
    const selectedLabel = partsList.find(part => part.value === selectedValue)?.label || "";
    setSelectedPart(selectedValue);
    setSelectedPartName(selectedLabel);
  };

  const handleAddPart = () => {
    if (selectedPart && selectedPartName) {
      setSelectedParts([...selectedParts, { id: selectedPart, name: selectedPartName }]);
      setSelectedPart("");
      setSelectedPartName(""); 
    } else {
      alert("Please select a part to add.");
    }
  };

  const handleRemovePart = (partId) => {
    setSelectedParts(selectedParts.filter(part => part.id !== partId));
  };

  const handleNext = () => {
    if (selectedParts.length > 0) {
      navigate("/personaldetail", {
        state: {
          make,
          model,
          year,
          selectedParts,
        },
      });
    } else {
      alert("Please add at least one part.");
    }
  };

  return (
    <div>
      <Navbar />
      
      <div className="results-container">
        <div className="col enquiry-section first-section">
          <div>
            <div className="enquiry-title text-center">
              <h5><span className="title-tag">Search Parts</span></h5>
            </div>
            <div className="part-section">
              <div className="row align-items-center">
                <div className="form-group col-md-10">
                  <select
                    id="parts-list"
                    className="form-control"
                    value={selectedPart}
                    onChange={handlePartChange}
                  >
                    {partsList.map(part => (
                      <option key={part.value} value={part.value}>
                        {part.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2 text-center">
                  <button type="button" className="btn btn-add-part" onClick={handleAddPart}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col enquiry-section second-section">
          <div className="enquiry-title">
            <h5 className="selected-vehicle-title"><span className="title-tag">Selected Vehicle Details</span></h5>
            <hr className="underline" />
          </div>
          <div className="enquiry-inner-details">
            <div className="row">
              <div className="col-md-12 selc-brand">
                SELECTED BRAND: {make}
              </div>
            </div>

            <div className="part-details-section row">
              <div className="vehicle-logo col-md-3 text-center">
                <img
                  src="https://www.selectusedparts.com/assets/images/2019/08/20190511_101154.gif"
                  alt="Vehicle Logo"
                  className="vehicle-img"
                />
              </div>
              <div className="vehicle-details col-md-9 text-center">
                <div className="row">
                  <div className="model-section col-md-6">
                    <h5 className="label" style={{ color: 'red' }}>MODEL</h5>
                    <h5 className="vehicle-inner"><strong>{model}</strong></h5>
                  </div>
                  <div className="year-section col-md-6">
                    <h5 className="label" style={{ color: 'red' }}>YEAR</h5>
                    <h5 className="vehicle-inner"><strong>{year}</strong></h5>
                  </div>
                </div>
              </div>
            </div>

            {selectedParts.length > 0 && (
              <div className="part-section row">
                <div className="col-md-12">
                  <h5 className="label" style={{ color: 'blue' }}>SELECTED PARTS</h5>
                  <ul>
                    {selectedParts.map((part) => (
                      <li key={part.id} className="selected-part">
                        {part.name} 
                        <button 
                          className="remove-part-btn" 
                          onClick={() => handleRemovePart(part.id)}
                        >
                          X
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="row">
              <div className="col-md-12 form-group">
                <h5 className="enquiry-title"><span className="title-tag">Any additional info (optional):</span></h5>
                <textarea name="additional_info" rows="1" className="form-control remove-border" placeholder="Type additional info here..."></textarea>
              </div>
            </div>

            {selectedParts.length > 0 && (
              <div className="row">
                <div className="col-md-12 text-center">
                  <button className="btn btn-next" onClick={handleNext}>
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <a 
        href="https://api.whatsapp.com/send?phone=+91 94746 62684" 
        className="whatsapp-link" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        Chat on WhatsApp
      </a>
      
      <Footer />
    </div>
  );
};

export default SearchAndResultsPage;
