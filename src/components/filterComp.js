import React from "react";
import { Input, Select } from "antd";
const { Search } = Input;

export const SearchBar = ({ onSearch }) => {
  return (
    <Search
      placeholder="Search news"
      onSearch={onSearch}
      enterButton
      style={{ marginBottom: "20px" }}
    />
  );
};

export const SelectCountry = ({ onSelect, dropdownWidth, dropdownRef }) => {
  return (
    <Select
      onChange={(data) => onSelect(data)}
      defaultValue=""
      style={{ width: dropdownWidth }}
      ref={dropdownRef}
      options={[
        {
          value: "",
          label: "All Country",
        },
        {
          value: "id",
          label: "Indonesia",
        },
        {
          value: "us",
          label: "United States",
        },
      ]}
    />
  );
};
