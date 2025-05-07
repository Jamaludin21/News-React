import React from "react";
import { Card } from "antd";
import WeatherChart from "components/chart/WeatherChart";

const WeatherCard = ({ title, weather, lang }) => {
  if (!weather) return null;
  const bgClass =
    weather?.weathercode < 3
      ? "bg-clear"
      : weather?.weathercode < 60
      ? "bg-cloudy"
      : "bg-rainy";

  return (
    <Card title={title} className={`weather-card ${bgClass}`}>
      <p>{weather?.temperature} °C</p>
      <p>{weather?.windspeed} km/h</p>
      <WeatherChart data={weather.hourly} lang={lang} />
    </Card>
  );
};

export default WeatherCard;
