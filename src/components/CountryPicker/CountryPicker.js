import React, { useState, useEffect } from "react";
import { fetchCountryData } from "../../api";
//Material-ui
import { NativeSelect, FormControl } from "@material-ui/core";

const CountryPicker = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const fetchedCountries = async () => {
      const data = await fetchCountryData();
      setCountries(data);
    };
    fetchedCountries();
  }, []);
  return (
    <div style={{ margin: "35px auto" }}>
      <FormControl size="small" fullWidth>
        <NativeSelect
          defaultValue=""
          onChange={(e) => handleCountryChange(e.target.value)}
        >
          <option value="">Global</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default CountryPicker;
