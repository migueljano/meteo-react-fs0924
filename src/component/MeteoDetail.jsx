import { useState } from "react";
import { useLocation } from "react-router-dom";

const MeteoDetails = () => {
  const location = useLocation();
  const { weatherInfo } = location.state || {};
  const [meteo5gg, setMeteo5gg] = useState([]);
  const fetchWeatherDays = () => {
    const apiKey = "711e8d9b8520830c3819d3f0de2b91a6";
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${weatherInfo.coord.lat}&lon=${weatherInfo.coord.lon}&appid=${apiKey}&units=metric`
    );
  };
};

export default MeteoDetails;
