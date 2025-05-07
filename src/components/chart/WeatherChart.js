import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const WeatherChart = ({ weatherData }) => {
  if (!weatherData?.time || !weatherData.temperature) return null;
  const chartData = [
    {
      time: weatherData.time.split("T")[1],
      temp: weatherData.temperature,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData}>
        <XAxis dataKey="time" tick={{ fontSize: 10 }} />
        <YAxis
          domain={[weatherData.temperature - 2, weatherData.temperature + 2]}
        />
        <Tooltip formatter={(val) => `${val} °C`} />
        <Line type="monotone" dataKey="temp" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeatherChart;
