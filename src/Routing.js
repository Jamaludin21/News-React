import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/MainPage";
import WeatherPage from "./pages/WeatherPage";

const Routing = () => {
  return (
    <Routes>
      <Route path="" element={<HomePage />} />
      <Route path="/weather" element={<WeatherPage />} />
      {/* <Route path="/movies" element={<MoviePage />} /> */}
    </Routes>
  );
};

export default Routing;
