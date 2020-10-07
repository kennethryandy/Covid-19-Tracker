import React from "react";
import CountUp from "react-countup";
import loading from "../../assets/loading.svg";
//Material-ui
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import cardsStyles from "./cardsStyles";

const Cards = ({ data: { confirmed, deaths, recovered, lastUpdate } }) => {
  const classes = cardsStyles();
  if (!confirmed) {
    return <img alt="loading" src={loading} />;
  }
  return (
    <div className={classes.container}>
      <Grid container justify="space-around">
        {/* CONFIRMED CARD */}
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={`${classes.card} ${classes.infected}`}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Infected
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={confirmed.value}
                duration={1.5}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
              {new Date(lastUpdate).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of active cases of COVID-19
            </Typography>
          </CardContent>
        </Grid>
        {/* RECOVERED CARD */}
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={`${classes.card} ${classes.recovered}`}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={recovered.value}
                duration={1.5}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
              {new Date(lastUpdate).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of recoveries from COVID-19
            </Typography>
          </CardContent>
        </Grid>
        {/* DEATHS CARD */}
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={`${classes.card} ${classes.deaths}`}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={deaths.value}
                duration={1.5}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
              {new Date(lastUpdate).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of deaths caused by COVID-19
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cards;
