import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button, Container, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TextField from "../FormTemplate/TextField";
import Typography from "../FormTemplate/Typography";
import BoxButton from "../FormTemplate/Button";
import AppBar from "../Login_Reg_Home/AppBar/MainAppBar";
import { purple, yellow } from "@material-ui/core/colors";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(10),
    marginBottom: 0,
    display: "flex",
  },
  cardWrapper: {
    zIndex: 1,
  },
  card: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#7391C8",
    padding: theme.spacing(8, 3),
  },
  cardContent: {
    maxWidth: 400,
  },
  textField: {
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  button: {
    width: "100%",
  },
  backButton: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.common.white,
  },
  helpButton: {
    backgroundColor: yellow[500],
    color: theme.palette.common.black,
  },
});

function Game(props) {
  const formValue = useRef();
  const history = useHistory();
  const { classes } = props;

  async function back() {
    try {
      history.push("./ChatGroups");
    } catch {}
  }

  async function Help() {
    try {
      history.push("./Help");
    } catch {}
  }

  const [userName, setUserName] = useState("");
  getUserName().then((x) => setUserName(x));

  const [btnDisabled, setBtnDisabled] = useState(true);

  const createFeedback = async (e) => {
    e.preventDefault();
    history.push("./Chat", { gNumber: formValue.current.value.toLowerCase() });
  };

  return (
    <div style={{ backgroundColor: "#cfe8fc", height: "100vh" }}>
      <AppBar />

      <Button
        variant="outlined"
        color="inherit"
        className={classes.backButton}
        onClick={back}
      >
        Back
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.helpButton}
        onClick={Help}
      >
        How does this work?
      </Button>
      <Container className={classes.root} component="section">
        <Grid container alignItems="center" justify="center" m={20}>
          <Grid item xs={12} md={6} className={classes.cardWrapper}>
            <div className={classes.card}>
              <form onSubmit={createFeedback} className={classes.cardContent}>
                <Typography variant="h2" component="h2" gutterBottom>
                  Game
                </Typography>
                <Typography variant="h5">
                  Which country will you visit once leisure travel is allowed?
                </Typography>
                <TextField
                  noBorder
                  className={classes.textField}
                  placeholder="Answer"
                  inputRef={formValue}
                  onChange={(text) => setBtnDisabled(!text.target.value)}
                />
                <BoxButton
                  type="submit"
                  color="primary"
                  variant="contained"
                  className={classes.button}
                  disabled={btnDisabled}
                >
                  Submit
                </BoxButton>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

async function getUserName() {
  const uid = firebase.auth().currentUser?.uid;
  const printed = await firebase.firestore().collection("users").doc(uid).get();
  try {
    return printed.data().username;
  } catch {}
}

Game.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Game);
