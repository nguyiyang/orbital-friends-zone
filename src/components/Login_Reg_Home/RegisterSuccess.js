import React from "react";
import { Container, Typography, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import PeepoClap from "./../Images/peepoClap.gif";
import { useHistory } from "react-router-dom";

const styles = (theme) => ({
  whole:{
    display: 'flex',
    backgroundColor: "#cfe8fc",
    height: "100%",
  },
  root: {

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(20),
    marginBottom: theme.spacing(25),
    height: "100%",
    align: "center",
  },
  button: {
    marginTop: theme.spacing(3),
    borderRadius: 0,
    height: "auto",
    
  },
  link: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  buoy: {
    marginTop: theme.spacing(3),
  },
});

function ThankYou(props) {
  const history = useHistory();
  const { classes } = props;

  async function Home() {
    try {
      history.push("./");
    } catch {}
  }

  return (
    <><section className={classes.whole}>
      <Container className={classes.root} component="section">
        <Typography align="center" color="textPrimary" variant="h2">
        Everything is done!
        </Typography>
        <br></br>
        <Typography align="center" color="textPrimary" variant="h6">
        Now, you have to wait for the group completion to be complete. Do visit the forum and the other chat groups to talk to others while waiting!
        </Typography>
        <br></br>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() => Home()}
          className = {classes.button}
        >
          Continue
        </Button>
      </Container>
      </section>
    </>
  );
}

ThankYou.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ThankYou);
