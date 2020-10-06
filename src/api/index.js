import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let countryURL = url;

  try {
    if (country) {
      countryURL = `${url}/countries/${country}`;
    }
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(countryURL);

    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const res = await axios.get(
      "https://disease.sh/v3/covid-19/jhucsse/counties"
    );
    const modifiedData = res.data.map((data) => ({
      confirmed: data.stats.confirmed,
      deaths: data.stats.deaths,
      date: data.updatedAt.split(" ")[0],
    }));
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountryData = async () => {
  const {
    data: { countries },
  } = await axios.get(`${url}/countries`);
  const modifiedData = countries.map((country) => country.name);
  return modifiedData;
};
