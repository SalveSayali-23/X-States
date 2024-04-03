/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCities, setSelectedCities] = useState("");

  const getCountries = async () => {
    try {
      const res = await fetch(
        "https://crio-location-selector.onrender.com/countries"
      );
      // console.log(res);
      const data = await res.json();
      //console.log(data)
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const getStates = async () => {
    try {
      const res = await fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      );
      // console.log(res);
      const data = await res.json();
      //console.log(data);
      setStates(data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  // https://crio-location-selector.onrender.com/country={countryName}/state={stateName}/cities

  const getCities = async () => {
    try {
      const res = await fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      );
      // console.log(res);
      const data = await res.json();
      // console.log(data);
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      getStates();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      getCities();
    }
  }, [selectedCountry, selectedState]);

  return (
    <div className="city-selector">
      <h1>Select Location</h1>
      <div className="dropdowns">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="dropdown"
        >
          <option value="" disabled>
            Select Country
          </option>

          {countries.map((country) => {
            return (
              <option key={country} value={country}>
                {country}
              </option>
            );
          })}
        </select>

        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="dropdown"
          disabled={!selectedCountry}
        >
          <option value="" disabled>
            Select State
          </option>

          {states.map((state) => {
            return (
              <option key={state} value={state}>
                {state}
              </option>
            );
          })}
        </select>

        <select
          value={selectedCities}
          onChange={(e) => setSelectedCities(e.target.value)}
          className="dropdown"
          disabled={!selectedState}
        >
          <option value="" disabled>
            Select City
          </option>

          {cities.map((city) => {
            return (
              <option key={city} value={city}>
                {city}
              </option>
            );
          })}
        </select>
      </div>
      {selectedCities && (
        <h2 className="result">
          You selected <span className="highlight">{selectedCities},</span>
          <span className="fade">
            {" "}
            {selectedState}, {selectedCountry}
          </span>
        </h2>
      )}
    </div>
  );
};

export default App;
