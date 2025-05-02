import React, { useEffect, useRef, useState } from "react";
import { SearchBar, SelectCountry } from "../components/filterComp";
import NewsList from "../components/listNews";
import { Flex } from "antd";

const HomePage = () => {
  const [query, setQuery] = useState("latest");
  const [countryID, setCountryID] = useState("");
  const [dropdownWidth, setDropdownWidth] = useState("auto");
  const dropdownRef = useRef(null);

  const handleSearch = (value) => {
    setQuery(value);
  };

  const handleSelectedCountry = (value) => {
    setCountryID(value);
  };

  useEffect(() => {
    // Calculate width based on the text content
    if (dropdownRef.current) {
      const textWidth = dropdownRef.current.offsetWidth;
      setDropdownWidth(`${textWidth}px`);
    }
  }, [countryID]);

  return (
    <div className="p-5">
      <Flex gap={4}>
        <SelectCountry
          onSelect={handleSelectedCountry}
          dropdownWidth={dropdownWidth}
          dropdownRef={dropdownRef}
        />

        <SearchBar onSearch={handleSearch} />
      </Flex>
      <NewsList query={query} countryID={countryID} />
    </div>
  );
};

export default HomePage;
