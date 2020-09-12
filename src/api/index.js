import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async country => {
  let countryURL = url;

  try {
    if (country) {
      countryURL = `${url}/countries/${country}`;
    }
    const {
      data: { confirmed, recovered, deaths, lastUpdate }
    } = await axios.get(countryURL);
    
    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const response = await axios.get(`${url}/daily`);
    const modifiedData = response.data.map(data => ({
      confirmed: data.confirmed.total,
      deaths: data.deaths.total,
      date: data.reportDate
    }));
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountryData = async () => {
  const {
    data: { countries }
  } = await axios.get(`${url}/countries`);
  const modifiedData = countries.map(country => country.name);
  return modifiedData;
};
