import React from "react";
import { Container, Typography, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../Login_Reg_Home/AppBar/MainAppBar";
import GroupNotFound from "./../Images/GroupNotFound.jpg";
import { useHistory } from "react-router-dom";

const styles = (theme) => ({
  root: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    height: "100%",
    align: "center",
  },
  button: {
    border: "4px solid currentColor",
    borderRadius: 0,
    height: "auto",
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
    <>
      <AppBar />
      <div style={{ backgroundColor: "#cfe8fc", height: "100vh" }}>
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
      </div>
    </>
  );
}

NoChat.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoChat);
