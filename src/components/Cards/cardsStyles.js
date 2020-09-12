import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  container: {
    margin: '50px 0'
  },
  card: {
    margin: "0 2% !important"
  },
  infected: {
    borderBottom: "10px solid rgb(0, 0, 255, 0.5)"
  },
  recovered: {
    borderBottom: "10px solid rgb(0, 255, 0, 0.5)"
  },
  deaths: {
    borderBottom: '10px solid rgb(255, 0, 0, 0.5)'
  },
}))