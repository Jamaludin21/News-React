import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchNews = async (query, countryID) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/${
        countryID !== "" ? "top-headlines" : "everything"
      }`,
      {
        params: {
          q: query === "" ? "latest" : query,
          ...(countryID !== "" && { country: countryID }),
          apiKey: API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
