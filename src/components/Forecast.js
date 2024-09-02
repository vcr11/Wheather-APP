import React, { useEffect, useState } from "react";
import axios from "axios";

// Import images from the src/images directory
import sunny from '../images/sun.png';
import sunWithCloud from '../images/sun_with_cloud.png';
import moon from '../images/moon.png';
import moonCloudy from '../images/moon_cloudy.png';

function Forecast({ weather }) {
  const { data } = weather;
  const [forecastData, setForecastData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    const fetchForecastData = async () => {
      const apiKey = "dfef1c685e2f3beb7af9cc078f47db1c";
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${apiKey}&units=metric`;

      try {
        const response = await axios.get(url);
        const dailyForecast = processForecastData(response.data.list);
        setForecastData(dailyForecast);
      } catch (error) {
        console.log("Error fetching forecast data:", error);
      }
    };

    if (data.name) {
      fetchForecastData();
    }
  }, [data.name]);

  const processForecastData = (list) => {
    const dailyData = [];

    // Group data by day
    list.forEach((entry) => {
      const date = new Date(entry.dt_txt).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });

      const existingEntry = dailyData.find(item => item.date === date);

      if (existingEntry) {
        existingEntry.temp_min = Math.min(existingEntry.temp_min, entry.main.temp_min);
        existingEntry.temp_max = Math.max(existingEntry.temp_max, entry.main.temp_max);
      } else {
        dailyData.push({
          date,
          temp_min: entry.main.temp_min,
          temp_max: entry.main.temp_max,
          description: entry.weather[0].description,
          icon: entry.weather[0].icon,
          dt: entry.dt
        });
      }
    });

    return dailyData.slice(0, 5); // Get only the first 5 days
  };

  const formatDay = (dateString) => {
    const options = { weekday: "short" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius((prevState) => !prevState);
  };

  const convertToFahrenheit = (temperature) => {
    return Math.round((temperature * 9) / 5 + 32);
  };

  const renderTemperature = (temperature) => {
    if (isCelsius) {
      return Math.round(temperature);
    } else {
      return convertToFahrenheit(temperature);
    }
  };

  const isDayTime = (timestamp) => {
    const hour = new Date(timestamp * 1000).getHours();
    return hour >= 6 && hour < 18;
  };

  const getWeatherImage = (description, timestamp) => {
    const lowerCaseDescription = description.toLowerCase();
    const dayTime = isDayTime(timestamp);

    if (lowerCaseDescription.includes("rain")) {
      return dayTime ? sunWithCloud : moonCloudy;
    } else if (lowerCaseDescription.includes("cloud")) {
      return dayTime ? sunWithCloud : moonCloudy;
    } else if (lowerCaseDescription.includes("sun") && dayTime) {
      return sunny;
    } else if (lowerCaseDescription.includes("sun") && !dayTime) {
      return moon;
    } else if (!dayTime) {
      return moon;
    } else {
      return sunny;
    }
  };

  return (
    <div>
      <div className="city-name">
        <h2>
          {data.name}, <span>{data.sys?.country}</span>
        </h2>
      </div>
      <div className="date">
        <span>{new Date().toLocaleDateString()}</span>
      </div>
      <div className="temp">
        {data.weather && data.weather[0]?.description && (
          <img
            src={getWeatherImage(data.weather[0]?.description, data.dt)}
            alt={data.weather[0]?.description || "weather icon"}
            className="weather-icon"
          />
        )}
        {renderTemperature(data.main?.temp)}
        <sup className="temp-deg" onClick={toggleTemperatureUnit}>
          {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
        </sup>
      </div>
      <p className="weather-des">
        {data.weather ? data.weather[0]?.description : "No description available"}
      </p>
      <div className="weather-info">
        <div className="col">
          <p className="wind">{data.wind?.speed} m/s</p>
          <p>Wind speed</p>
        </div>
        <div className="col">
          <p className="humidity">{data.main?.humidity}%</p>
          <p>Humidity</p>
        </div>
      </div>
      <div className="forecast">
        <h3>5-Day Forecast:</h3>
        <div className="forecast-container">
          {forecastData.map((day, index) => (
            <div className="day" key={index}>
              <p className="day-name">{formatDay(day.date)}</p>
              <img
                src={getWeatherImage(day.description, day.dt)}
                alt={day.description || "weather icon"}
                className="day-icon"
              />
              <p className="day-temperature">
                {Math.round(day.temp_min)}°/ <span>{Math.round(day.temp_max)}°</span>
              </p>
              <p>{day.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Forecast;
