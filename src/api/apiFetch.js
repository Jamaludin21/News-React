import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const NEWS_BASE_URL = process.env.REACT_APP_NEWS_API_BASE_URL;
const WEATHER_BASE_URL = process.env.REACT_APP_WEATHER_API_BASE_URL;

export const fetchNews = async (
  query = "",
  categoryID = "",
  countryID = ""
) => {
  const isCategorySelected = categoryID !== "";
  const isCountrySelected = countryID !== "";
  const isCountryAndCategorySelected = categoryID !== "" && countryID !== "";
  const endpoint =
    isCategorySelected || isCountrySelected ? "top-headlines" : "everything";

  const params = {
    apiKey: API_KEY,
    ...(isCountryAndCategorySelected && {
      category: categoryID,
      country: countryID,
    }),
    ...(!isCountryAndCategorySelected &&
      isCategorySelected && { category: categoryID }),
    ...(!isCountryAndCategorySelected &&
      isCountrySelected && { country: countryID }),
    ...((endpoint === "everything" && { q: query || "latest" }) ||
      (endpoint === "top-headlines" && query && { q: query })),
  };

  try {
    const response = await axios.get(`${NEWS_BASE_URL}/${endpoint}`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

export const fetchWeather = async (latitude, longitude) => {
  try {
    const response = await axios.get(`${WEATHER_BASE_URL}/forecast`, {
      params: {
        latitude,
        longitude,
        current_weather: true,
      },
    });
    return response.data.current_weather;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw new Error("Weather API fetch failed");
  }
};
