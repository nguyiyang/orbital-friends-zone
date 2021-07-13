import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";
import { Helmet } from "react-helmet";
import { Box, Container, Typography, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../Login_Reg_Home/AppBar/MainAppBar";
import GroupNotFound from "./../Images/GroupNotFound.jpg";

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
    border: "4px solid currentColor",
    borderRadius: 0,
    height: "auto",
    padding: theme.spacing(2, 5),
  },
  link: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  buoy: {
    width: "50%",
  },
});

function NoChat(props) {
  const history = useHistory();
  const { classes } = props;

  async function ChatGroups() {
    try {
      history.push("./ChatGroups");
    } catch {}
  }

  return (
    /*
    <div>
      <div>
        <Button variant="link" onClick={Home}>
          Back
        </Button>
      </div>
      <div>
        You have not been assigned a group. 😞 Group Creation will be done from
        0000-0600 every Monday. Check again later!
      </div>
    </div>
    */
    <>
      <AppBar />
      <Container className={classes.root} component="section">
        <Typography align="center" color="textPrimary" variant="h2">
          Oops! You have not been assigned a group.
        </Typography>
        <br></br>
        <Typography align="center" color="textPrimary" variant="subtitle2">
          Group Creation will be done from 0000-0600 every Monday. Check again
          later!
        </Typography>
        <br></br>
        <img src={GroupNotFound} className={classes.buoy} alt="buoy" />
        <br></br>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() => ChatGroups()}
        >
          Go back
        </Button>
      </Container>
    </>
  );
}

NoChat.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoChat);
