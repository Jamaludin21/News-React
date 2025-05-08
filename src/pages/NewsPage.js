import React, { useEffect, useRef, useState } from "react";
import {
  SearchBar,
  SelectCategory,
  SelectCountry,
} from "components/filterComp";
import NewsList from "components/News/listNews";
import { Flex } from "antd";

const NewsPage = () => {
  const [query, setQuery] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [countryID, setCountryID] = useState("");
  const [dropdownWidth, setDropdownWidth] = useState("auto");
  const dropdownRef = useRef(null);

  const handleSearch = (value) => {
    setQuery(value);
  };

  const handleSelectedCatagory = (value) => {
    setCategoryID(value);
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
  }, [categoryID]);

  return (
    <div className="p-5">
      <Flex gap={4}>
        <SelectCountry
          onSelect={handleSelectedCountry}
          dropdownWidth={dropdownWidth}
          dropdownRef={dropdownRef}
        />
        <SelectCategory
          onSelect={handleSelectedCatagory}
          dropdownWidth={dropdownWidth}
          dropdownRef={dropdownRef}
        />
        <SearchBar onSearch={handleSearch} />
      </Flex>
      <div>
        <NewsList query={query} categoryID={categoryID} countryID={countryID} />
      </div>
    </div>
  );
};

export default NewsPage;
