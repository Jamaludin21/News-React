import React, { useState } from "react";
import SearchBar from "../components/searchComp";
import NewsList from "../components/listNews";

const HomePage = () => {
  const [query, setQuery] = useState("latest");

  const handleSearch = (value) => {
    setQuery(value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <SearchBar onSearch={handleSearch} />
      <NewsList query={query} />
    </div>
  );
};

export default HomePage;
