import React from "react";
import { Input } from "antd";

const { Search } = Input;

const SearchBar = ({ onSearch }) => {
  return (
    <Search
      placeholder="Search news"
      onSearch={onSearch}
      enterButton
      style={{ marginBottom: "20px" }}
    />
  );
};

export default SearchBar;
