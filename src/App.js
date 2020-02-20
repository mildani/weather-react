import React from 'react';
import './App.css';
import CurrentWeather from "./CurrentWeather";
import SourceCode from "./SourceCode";

export default function App() {
  return (
    <div className="App">
      <div className="app-container">
        <h6>Weather Search</h6>
        <CurrentWeather />
      </div>
      <SourceCode />
    </div>
  );
}
