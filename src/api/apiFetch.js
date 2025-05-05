import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
    const response = await axios.get(`${BASE_URL}/${endpoint}`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
