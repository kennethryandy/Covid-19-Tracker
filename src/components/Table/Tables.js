import React, { useEffect, useState } from "react";
import axios from "axios";
import { sortCountries } from "../../util";
//Material-ui
import {
  Avatar,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    "& th": {
      fontWeight: 600,
    },
  },
  tableContainer: {
    margin: "40px auto 10px auto",
    overflowY: "scroll",
    maxHeight: "360px",
    border: "5px solid white",
    borderRadius: "8px",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      height: 320,
    },
  },
  tableRow: {
    backgroundColor: "#FFF",
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(2),
  },
}));

const Tables = () => {
  const classes = useStyles();
  const [countries, setCountries] = useState([]);

  const getCountriesData = async () => {
    try {
      const res = await axios.get("https://disease.sh/v3/covid-19/countries");
      const data = sortCountries(res.data);
      data.map((data) =>
        setCountries((prevState) => [
          ...prevState,
          {
            country: data.country,
            cases: data.cases,
            flag: data.countryInfo.flag,
          },
        ])
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCountriesData();
    //eslint-disable-next-line
  }, []);
  return (
    countries.length >= 215 && (
      <TableContainer className={classes.tableContainer}>
        <Table size="small" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Worldwide Cases</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell>Cases</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries.map((data, i) => (
              <TableRow key={i} className={i % 2 === 0 ? classes.tableRow : ""}>
                <TableCell>
                  <Avatar
                    className={classes.small}
                    variant="rounded"
                    src={data.flag}
                  />
                  {data.country}
                </TableCell>
                <TableCell>{data.cases.toLocaleString("en")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
};

export default Tables;
