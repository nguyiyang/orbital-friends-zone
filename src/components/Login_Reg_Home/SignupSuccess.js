import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";
import { Box, Container, Typography, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import WelcomeImage from "./../Images/Welcome.jpeg";

const styles = (theme) => ({
  root: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(5),

    height: "100%",
    align: "center",
  },
  button: {
    marginTop:theme.spacing(1),
    borderRadius: 0,
    height: "auto",
 
  },
  link: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  buoy: {
    width:"70%",
  },
});

function ThankYou(props) {
  const history = useHistory();
  const { classes } = props;

  async function Home() {
    try {
      history.push("./Login");
    } catch {}
  }

  return (
    <>
      <Container className={classes.root} component="section">
        <Typography align="center" color="textPrimary" variant="h2">
        Register Success!
        </Typography>
        <br></br>
        <br></br>
        <img src={WelcomeImage} className={classes.buoy} alt="buoy" />
        <br></br>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() => Home()}
          className={classes.button}
        >
          Login
        </Button>
      </Container>
    </>
  );
}

ThankYou.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ThankYou);

