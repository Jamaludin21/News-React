import React from "react";
import { Card, Typography } from "antd";

const WeatherCard = ({ title, weather }) => (
  <Card title={`Weather in ${title}`} style={{ width: "100%" }}>
    {weather ? (
      <React.Fragment>
        <Typography.Text>Temperature: {weather.temperature} °C</Typography.Text>
        <br />
        <Typography.Text>Wind: {weather.windspeed} km/h</Typography.Text>
      </React.Fragment>
    ) : (
      <Typography.Text>No data available</Typography.Text>
    )}
  </Card>
);

export default WeatherCard;
