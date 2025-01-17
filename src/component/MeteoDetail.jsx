import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const MeteoDetails = () => {
  const location = useLocation();
  const { weatherInfo } = location.state || {};
  const [meteo5gg, setMeteo5gg] = useState([]);

  const fetchWeatherDays = () => {
    const apiKey = "711e8d9b8520830c3819d3f0de2b91a6";
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${weatherInfo.coord.lat}&lon=${weatherInfo.coord.lon}&appid=${apiKey}&units=metric`
    )
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Errore nella chiamata");
        }
      })
      .then((data) => {
        console.log(data);
        setMeteo5gg(data.list);
      })
      .catch((error) => {
        console.error("Errore:", error);
      });
  };
  useEffect(() => {
    if (weatherInfo) {
      fetchWeatherDays();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherInfo]);
  if (!weatherInfo) {
    return (
      <Container className="text-center pt-5">
        <div>
          <h3>Nessun dato trovato!</h3>
        </div>
      </Container>
    );
  } else {
    const description = weatherInfo.weater[0].main;
    const firstTemperature = weatherInfo.main.temp;
    const minTemperature = weatherInfo.main.temp_min;
    const maxTemperature = weatherInfo.main.temp_max;

    const getWeatherIcon = (description) => {
      switch (description) {
        case "Thunderstorm":
          return "⛈️";
        case "Rain":
          return "🌧️";
        case "Snow":
          return "❄️";
        case "Clear":
          return "☀️";
        case "Clouds":
          return "☁️";

        case "Fog":
          return "🌫️";

        default:
          return "❓";
      }
    };
    return (
      <Container fluid className="main-section pt-3">
        <div className="d-flex flex-column pb-4">
          <div className="d-flex flex-column display-1 text-center mx-auto">
            <p className="text-light fw-bold">
              {weatherInfo.name.toUpperCase()}
            </p>
            <p className="display-1">{getWeatherIcon(description)}</p>
            <p className="text-light">{weatherInfo.weather[0].description}</p>
          </div>
          <div className="d-flex mx-auto flex-column">
            <div className="d-flex align-items-center gap-4">
              <div className="fs-1">
                <p className="text-light">
                  <i
                    className="bi bi-thermometer-half me-2"
                    style={{ color: "white", fontSize: "24px" }}
                  ></i>
                  <strong>Temperature:</strong>{" "}
                  {(firstTemperature - 273.15).toFixed(1)} °C
                </p>
              </div>
              <div
                className="d-flex flex-column fs-5"
                style={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                <p>
                  <strong>Max: </strong> {(maxTemperature - 273.15).toFixed(1)}
                </p>
                <p>
                  <strong>Min: </strong> {(minTemperature - 273.15).toFixed(1)}
                </p>
              </div>
            </div>

            <div className="fs-1">
              <p className="text-light">
                <i
                  className="bi bi-droplet-fill me-2"
                  style={{ color: "white", fontSize: "24px" }}
                ></i>
                <strong>Humidity:</strong> {weatherInfo.main.humidity}%
              </p>
            </div>
            <div className="fs-1 pb-3">
              <p className="text-light">
                <i
                  className="bi bi-wind me-2"
                  style={{ color: "white", fontSize: "24px" }}
                ></i>
                <strong>Wind:</strong> {weatherInfo.wind.speed} m/s
              </p>
            </div>
          </div>
          <div>
            {" "}
            <h1 className="text-light ms-4 mb-4 ">Next Five Days:</h1>
          </div>
        </div>
      </Container>
    );
  }
};

export default MeteoDetails;
