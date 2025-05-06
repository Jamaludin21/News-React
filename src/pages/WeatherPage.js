import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Spin, Alert } from "antd";
import { fetchWeather } from "../api/apiFetch";
import { provinceCoordinates } from "../utils/dataHelper";
import WeatherCard from "../components/card/WeatherCard";

const WeatherPage = () => {
  const cacheRef = useRef({}); // cache weather data
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWeather = async () => {
      setLoading(true);
      const dataMap = {};
      try {
        await Promise.all(
          provinceCoordinates.map(async (province) => {
            const { name, lat, lon } = province;

            // Use cache if exists
            if (cacheRef.current[name]) {
              dataMap[name] = cacheRef.current[name];
            } else {
              const data = await fetchWeather(lat, lon);
              cacheRef.current[name] = data; // save to cache
              dataMap[name] = data;
            }
          })
        );
        setWeatherData(dataMap);
      } catch (err) {
        setError("Failed to fetch some weather data.");
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, []);

  if (loading) return <Spin tip="Loading weather data..." fullscreen />;
  if (error) return <Alert type="error" message={error} />;

  return (
    <Row gutter={[16, 16]}>
      {provinceCoordinates.map((province) => (
        <Col key={province.name} xs={24} sm={12} md={8} lg={6} xl={4} xxl={4}>
          <WeatherCard
            title={province.name}
            weather={weatherData[province.name]}
          />
        </Col>
      ))}
    </Row>
  );
};

export default WeatherPage;
