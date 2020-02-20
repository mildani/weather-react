import React, { useState } from "react";
import "./CurrentWeather.css";
import axios from "axios";

export default function CurrentWeather() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${
        response.data.weather[0].icon
      }@2x.png`,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "3a94f3778290bfeee61278505dbbe51d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form className="search-city-form" onSubmit={handleSubmit}>
      <input
        className="searched-city"
        type="text"
        onChange={updateCity}
        placeholder="Enter a city"
        autoComplete="off"
      />
      <input className="search-button" type="submit" value="Search" />
    </form>
  );

  if (loaded) {
    return (
      <div className="CurrentWeather">
        {form}
        <div className="time-stamp-display">Last updated </div>
        <div className="city-display">{city}</div>
        <div className="weather-description-display">{weather.description}</div>
        <div className="temperature-display">
          <img
            className="main-icon"
            src={weather.icon}
            alt={weather.description}
          />
          <span className="temperature-value">{weather.temperature}</span>
          <button className="celsius-button">ºC</button>
          <span className="temp-button">|</span>
          <button className="fahrenheit-button">ºF</button>
        </div>
        <div>
          <ul>
            <li className="humidity">Humidity: {weather.humidity}%</li>
            <li className="wind-speed">Wind: {weather.wind}km/h</li>
          </ul>
        </div>
      </div>
    );
  } else {
    return <div className="CurrentWeather">{form}</div>;
  }
}
