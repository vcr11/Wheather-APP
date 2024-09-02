import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchEngine from "./SearchEngine";
import Forecast from "./Forecast";

import "../styles.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false,
  });

  const toDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  // Search function
  const search = async (event) => {
    event.preventDefault();
    if (
      event.type === "click" ||
      (event.type === "keypress" && event.key === "Enter")
    ) {
      setWeather({ ...weather, loading: true });
      const apiKey = "dfef1c685e2f3beb7af9cc078f47db1c";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;

      await axios
        .get(url)
        .then((res) => {
          console.log("API Response:", res);
          if (res.data.cod === 200) { // City found
            setWeather({ data: res.data, loading: false, error: false });
          } else { // City not found or other error
            setWeather({ ...weather, data: {}, error: true });
            console.log("City not found:", res.data.message);
          }
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          console.log("API Error:", error);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (weather.data.name) { // Check if city name is available
        const apiKey = "dfef1c685e2f3beb7af9cc078f47db1c";
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${weather.data.name}&appid=${apiKey}&units=metric`;

        try {
          const response = await axios.get(url);
          setWeather({ data: { ...weather.data, forecast: response.data }, loading: false, error: false });
        } catch (error) {
          setWeather({ data: {}, loading: false, error: true });
          console.log("Error fetching forecast data:", error);
        }
      }
    };

    fetchData();
  }, [weather.data.name]);

  return (
    <div className="App">
      {/* SearchEngine component */}
      <SearchEngine query={query} setQuery={setQuery} search={search} />

      {weather.loading && (
        <>
          <br />
          <br />
          <h4>Searching..</h4>
        </>
      )}

      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <span style={{ fontFamily: "font" }}>
              Sorry, city not found, please try again.
            </span>
          </span>
        </>
      )}

      {weather.data && weather.data.weather && (
        // Forecast component
        <Forecast weather={weather} toDate={toDate} />
      )}
    </div>
  );
}

export default App;
