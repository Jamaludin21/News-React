import React, { useCallback, useEffect, useState } from "react";
import { Spin, Alert, Select, Row, Col, Typography } from "antd";
import { fetchWeather } from "api/apiFetch";
import { provinceCoordinates } from "utils/dataHelper";
import WeatherCard from "components/card/WeatherCard";
import { useGeolocation } from "utils/hooks/useGeolocation";
import { useTranslations } from "utils/hooks/useTranslation";

const { Option } = Select;
const { Title } = Typography;

const WeatherPage = () => {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { location } = useGeolocation();
  const { t, language, changeLanguage } = useTranslations();
  const titleRender = selectedProvince
    ? selectedProvince.name
    : t.current_location;

  const handleProvinceChange = (value) => {
    const province = provinceCoordinates.find((p) => p.name === value);
    if (province) {
      fetchData(province.lat, province.lon);
      setSelectedProvince(province);
    }
  };

  const fetchData = useCallback(async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(lat, lon);
      setWeatherData(data);
    } catch (err) {
      setError("fetchError");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (location) {
      fetchData(location.latitude, location.longitude);
    }
  }, [fetchData, location]);

  if (loading) return <Spin tip="Loading weather data..." fullscreen />;
  if (error) return <Alert type="error" message={error} />;

  return (
    <div className="weather-container">
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={3}>{titleRender}</Title>
        </Col>
        <Col>
          <Select
            defaultValue={language}
            onChange={changeLanguage}
            style={{ width: 120, marginRight: 16 }}
          >
            <Option value="en">English</Option>
            <Option value="id">Bahasa</Option>
          </Select>
        </Col>
      </Row>

      <Select
        showSearch
        placeholder={t.select_province}
        onChange={handleProvinceChange}
        style={{ width: "100%", marginBottom: 16 }}
      >
        {provinceCoordinates.map((prov) => (
          <Option key={prov.name} value={prov.name}>
            {prov.name}
          </Option>
        ))}
      </Select>

      {loading && <Spin tip={t.weather_loading} fullscreen />}
      {error && <Alert type="error" message={error} />}

      {weatherData && (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <WeatherCard title={titleRender} weather={weatherData} />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default WeatherPage;
