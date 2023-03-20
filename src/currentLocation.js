import React, { useEffect, useState } from "react";
import apiKeys from "./apiKeys";
import Clock from "react-live-clock";
import Forcast from "./forecast";
import { GridLoader } from "react-spinners";
import ReactAnimatedWeather from "react-animated-weather";
function CurrentLocation() {
  const dateBuilder = (d) => {
    let months = [
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
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };
  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [temperatureC, setTemperatureC] = useState();
  const [temperatureF, setTemperatureF] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [humidity, setHumidity] = useState();
  const [description, setDescription] = useState();
  const [icon, setIcon] = useState("CLEAR_DAY");

  useEffect(() => {
    if (navigator.geolocation) {
      getPosition()
        .then((position) => {
          getWeather(position.coords.latitude, position.coords.longitude);
        })
        .catch((err) => {
          getWeather(28.67, 77.22);
          setErrorMessage(
            "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
          );
        });
    } else {
      setErrorMessage("Geolocation not available");
    }

    const timerID = setInterval(() => getWeather(lat, lon), 600000);
    return () => clearInterval(timerID);
  }, []);

  const getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  const getWeather = async (lat, lon) => {
    const api_call = await fetch(
      `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
    );
    const data = await api_call.json();

    const { name, main, coord } = data;

    setLat(coord.lat);
    setLon(coord.lon);
    setCity(name);
    setTemperatureC(Math.round(main.temp));
    setTemperatureF(Math.round(main.temp * 1.8 + 32));
    setHumidity(main.humidity);
    setDescription(data.weather[0].main);
    setCountry(country);

    switch (description) {
      case "haze":
        setIcon("Haze");
        break;
      case "Clouds":
        setIcon("CLOUDY");
        break;
      case "Rain":
        setIcon("RAIN");
        break;
      case "Snow":
        setIcon("SNOW");
        break;
      case "Dust":
        setIcon("WIND");
        break;
      case "Drizzle":
        setIcon("SLEET");
        break;
      case "Fog":
        setIcon("FOG");
        break;
      case "Smoke":
        setIcon("FOG");
        break;
      case "Tornado":
        setDescription("WIND");
        break;
      default:
        setDescription("CLEAR_DAY");
    }
  };

  if (temperatureC) {
    return (
      <React.Fragment>
        <div className="city">
          <div className="title">
            <h2>{city}</h2>
            <h3>{country}</h3>
          </div>
          <div className="mb-icon">
            {" "}
            <ReactAnimatedWeather
              icon={icon}
              color={defaults.color}
              size={defaults.size}
              animate={defaults.animate}
            />
            <p>{description}</p>
          </div>
          <div className="date-time">
            <div className="dmy">
              <div id="txt"></div>
              <div className="current-time">
                <Clock format="HH:mm:ss" interval={1000} ticking={true} />
              </div>
              <div className="current-date">{dateBuilder(new Date())}</div>
            </div>
            <div className="temperature">
              <p>
                {temperatureC}°<span>C</span>
              </p>
            </div>
          </div>
        </div>
        <Forcast icon={icon} weather={description} />
      </React.Fragment>
    );
  } else {
    return (
      <div className="loader">
        <GridLoader color={"#36D7B7"} loading={true} />

        <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
          Detecting your location
        </h3>
        <h3 style={{ color: "white", marginTop: "10px" }}>
          Your current location wil be displayed on the App <br></br> & used for
          calculating Real time weather.
        </h3>
      </div>
    );
  }
}
export default CurrentLocation;
