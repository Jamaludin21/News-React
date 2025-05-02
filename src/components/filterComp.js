import React from "react";
import { Input, Select } from "antd";
import { listCodeCountry } from "../utils/dataHelper";
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
      options={listCodeCountry}
    />
  );
};
