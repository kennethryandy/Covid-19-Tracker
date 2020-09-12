import React, { Component } from "react";
import { fetchData } from "./api";
import styles from "./App.module.css";
import virus from "./assets/virus.svg";
import diagram from "./assets/diagram.svg";
//Components
import Cards from "./components/Cards/Cards";
import Chart from "./components/Chart/Chart";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import WorldMap from "./components/WorldMap/WorldMap";
import Table from "./components/Table/Tables";
//Material-ui
import { Avatar, Divider, Grid, Typography } from "@material-ui/core";

class App extends Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const fetchedDatas = await fetchData();
    this.setState({
      data: fetchedDatas,
    });
  }

  handleCountryChange = async (country) => {
    const fetchedCountryDatas = await fetchData(country);
    this.setState({ data: fetchedCountryDatas, country: country });
  };

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.app}>
        <Typography variant="h3" className={styles.title}>
          <img className={styles.logo} alt="logo" src={virus} />
          Covid-19 Tracker
        </Typography>
        <Divider style={{ width: "100%" }} />
        <Grid container className={styles.grid} spacing={4}>
          <Grid item sm={8}>
            <Cards data={data} />
            <Divider />
            <WorldMap country={country} />
          </Grid>
          <Grid container item sm={4}>
            <Table />
            <CountryPicker handleCountryChange={this.handleCountryChange} />
            <Typography className={styles.diagramTitle} variant="h5">
              Graph <Avatar variant="rounded" src={diagram} />
            </Typography>
            <Chart data={data} country={country} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
