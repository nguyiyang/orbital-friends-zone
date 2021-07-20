import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "@firebase/auth";
import "@firebase/firestore";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "20vh",
    width: "50vw",
    padding: theme.spacing(3),
    textAlign: "center",
  },
  description: {
    width: "50vw",
    padding: theme.spacing(3),
  },
  radio: {
    justify: "center",
  },
  control: {
    padding: theme.spacing(2),
  },
  button: {
    height: "20vh",
    width: "10vw",
    marginLeft: "25vw",
  },
}));

export default function Question(props) {
  const classes = useStyles();
  const { value, onChange } = props;

  return (
    <Grid item>
      <Paper className={classes.description}>
        <FormControl component="fieldset">
          <FormLabel component="legend">{props.name}</FormLabel>
          <br></br>

          <RadioGroup
            row
            aria-label={props.number}
            name={props.number}
            value={value}
            onChange={onChange}
          >
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="1"
              style={{ marginLeft: "4vw" }}
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="2"
              style={{ marginLeft: "4vw" }}
            />
            <FormControlLabel
              value="3"
              control={<Radio />}
              label="3"
              style={{ marginLeft: "4vw" }}
            />
            <FormControlLabel
              value="4"
              control={<Radio />}
              label="4"
              style={{ marginLeft: "4vw" }}
            />
            <FormControlLabel
              value="5"
              control={<Radio />}
              label="5"
              style={{ marginLeft: "4vw" }}
            />
          </RadioGroup>
        </FormControl>
      </Paper>
    </Grid>
  );
}
