import React, { useState } from "react";
import axios from "axios";
import WeatherForecastElement from "./WeatherForecastElement";
import "./WeatherForecast.css";

export default function WeatherForecast({ city }) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState(null);

  function returnForecastData(response) {
    setForecast(response.data);
    setLoaded(true);
  }

  if (loaded && city === forecast.city.name) {
    return (
      <div className="WeatherForecast row">
        {forecast.list.map((forecast) => (
          <WeatherForecastElement data={forecast} key={forecast.dt} />
        ))}
      </div>
    );
  } else {
    const apiKey = `5b9b44f4af89e560de05a6c1fdb8a8ec`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&cnt=5`;
    axios.get(forecastUrl).then(returnForecastData);

    return null;
  }
}
