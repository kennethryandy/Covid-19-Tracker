import React, { useEffect, useState } from "react";
import axios from "axios";
import { Map, TileLayer, Circle, Popup } from "react-leaflet";
//Material-ui
import { Paper, Button, Avatar, Typography } from "@material-ui/core";
import mapStyles from "./worldMapStyles";

const WorldMap = ({ country }) => {
  const [position, setPosition] = useState({ lat: 34.80746, lng: -40.4796 });
  const [zoom, setZoom] = useState(3);
  const [types, setTypes] = useState({
    type: "cases",
    fill: "rgb(0, 0, 255, 0.5)",
    hex: "#8561c5",
    multiplier: 600,
  });
  const classes = mapStyles();

  const [countries, setCountries] = useState([]);
  const getCountriesData = async () => {
    try {
      const res = await axios.get("https://disease.sh/v3/covid-19/countries");
      const data = res.data?.map(
        ({
          cases,
          deaths,
          recovered,
          country,
          todayCases,
          todayDeaths,
          todayRecovered,
          countryInfo: { flag, lat, long },
        }) => ({
          cases,
          deaths,
          recovered,
          country,
          flag,
          lat,
          lng: long,
          todayCases,
          todayDeaths,
          todayRecovered,
        })
      );
      setCountries(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getLocation);
    getCountriesData();
    // eslint-disable-next-line
  }, []);
  const getLocation = ({ coords }) => {
    setPosition({ lat: coords.latitude, lng: coords.longitude });
    setZoom(5);
  };
  useEffect(() => {
    if (country && countries.length > 0) {
      const selectedCountry = countries.find(
        (name) => name.country === country
      );
      if (selectedCountry) {
        setZoom(6);
        setPosition({ lat: selectedCountry.lat, lng: selectedCountry.lng });
      }
    } else {
      setZoom(3);
      setPosition({ lat: 34.80746, lng: -40.4796 });
    }
    // eslint-disable-next-line
  }, [country]);
  return (
    <>
      <div className={classes.mapBtns}>
        <Button
          onClick={() =>
            setTypes({
              type: "cases",
              fill: "rgb(0, 0, 255, 0.5)",
              hex: "#8561c5",
              multiplier: 600,
            })
          }
          size="small"
          variant="contained"
          className={classes.infected}
        >
          Infected
        </Button>
        <Button
          onClick={() =>
            setTypes({
              type: "recovered",
              fill: "rgb(0, 255, 0, 0.5)",
              hex: "#6fbf73",
              multiplier: 1200,
            })
          }
          size="small"
          variant="contained"
          className={classes.recoverd}
        >
          Recovered
        </Button>
        <Button
          onClick={() =>
            setTypes({
              type: "deaths",
              fill: "rgb(255, 0, 0, 0.5)",
              hex: "#ff7878",
              multiplier: 2000,
            })
          }
          size="small"
          variant="contained"
          className={classes.deaths}
        >
          Deaths
        </Button>
      </div>
      <Paper className={classes.map} elevation={3}>
        <Map center={[position.lat, position.lng]} zoom={zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {countries?.map((data, i) => (
            <Circle
              key={i}
              center={[data.lat, data.lng]}
              radius={Math.sqrt(data[types.type]) * types.multiplier}
              color={types.hex}
              fillColor={types.fill}
            >
              <Popup>
                <div>
                  <Avatar
                    className={classes.small}
                    variant="rounded"
                    src={data.flag}
                  />
                  <Typography variant="h6">{data.country}</Typography>
                </div>
                <div>
                  <Typography variant="subtitle2">
                    {types.type.toUpperCase()}:{" "}
                    {data[types.type].toLocaleString("en")}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6">Today: </Typography>
                  <Typography variant="subtitle2">
                    Today's Cases: {data.todayCases.toLocaleString("en")}
                  </Typography>
                  <Typography variant="subtitle2">
                    Today's Recovered:{" "}
                    {data.todayRecovered.toLocaleString("en")}
                  </Typography>
                  <Typography variant="subtitle2">
                    Today's Deaths: {data.todayDeaths.toLocaleString("en")}
                  </Typography>
                </div>
              </Popup>
            </Circle>
          ))}
        </Map>
      </Paper>
    </>
  );
};

export default WorldMap;
