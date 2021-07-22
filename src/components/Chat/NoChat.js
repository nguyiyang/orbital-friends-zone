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
    align: "center",
  },
  buoy: {
    width: "50%",
  },
  backButton: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.common.white,
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
    <div style={{ backgroundColor: "#cfe8fc", height: "100vh" }}>
      <AppBar />
      <Button
        variant="outlined"
        color="inherit"
        className={classes.backButton}
        onClick={() => ChatGroups()}
      >
        Back
      </Button>
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
        </Container>
    </div>
  );
}

NoChat.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoChat);
