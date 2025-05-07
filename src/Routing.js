import { Route, Routes } from "react-router-dom";
import NewsPage from "./pages/NewsPage";
import WeatherPage from "./pages/WeatherPage";

const Routing = () => {
  return (
    <Routes>
      <Route path="" element={<NewsPage />} />
      <Route path="/weather" element={<WeatherPage />} />
      {/* <Route path="/movies" element={<MoviePage />} /> */}
    </Routes>
  );
};

export default Routing;
