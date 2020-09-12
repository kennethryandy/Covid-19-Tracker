import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  mapBtns: {
    "& button": {
      margin: "1rem",
      color: "#e9ebee",
    },
    "& :hover": {
      backgroundColor: "#e9ebee",
      color: "#000",
    },
    display: "flex",
    justifyContent: "center",
  },
  infected: {
    backgroundColor: "rgb(0, 0, 255, 0.5)",
  },
  recoverd: {
    backgroundColor: "rgb(0, 255, 0, 0.5)",
  },
  deaths: {
    backgroundColor: "rgb(255, 0, 0, 0.5)",
  },
  map: {
    "& .leaflet-container": {
      height: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      height: 500,
      padding: "1rem",
      width: "95%",
      margin: "auto",
      backgroundColor: "#FFF",
    },
    [theme.breakpoints.down("sm")]: {
      height: 300,
      padding: "1rem",
      width: "85%",
      margin: "auto",
      backgroundColor: "#FFF",
    },
  },
  medium: {
    width: theme.spacing(4),
    height: theme.spacing(3),
  },
}));
