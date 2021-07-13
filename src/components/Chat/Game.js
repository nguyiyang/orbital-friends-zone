/*import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";

export default function Game() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function back() {
    try {
      history.push("./ChatGroups");
    } catch {}
  }

  return (
    <div>
      <header>
        <Button variant="link" onClick={back}>
          Back
        </Button>
      </header>
      What would you like for dinner tonight?
      <section>
        <GameQ />
      </section>
    </div>
    
  );
}

function GameQ() {
  const [formValue, setFormValue] = useState("");

  const history = useHistory();

  const createFeedback = async (e) => {
    e.preventDefault();
    history.push("./Chat", { gNumber: formValue });
    setFormValue("");
  };

  return (
    <>
      <form onSubmit={createFeedback}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Answer"
        />
        <button type="submit" disabled={!formValue}>
          -
        </button>
      </form>
    </>
  );
}
*/

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '../FormTemplate/TextField';
import Typography from '../FormTemplate/Typography';
import BoxButton from '../FormTemplate/Button';
import { Box, Container, Button } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";
import AppBar from "../Login_Reg_Home/AppBar/MainAppBar";
import { purple, yellow } from "@material-ui/core/colors";

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(10),
    marginBottom: 0,
    display: 'flex',
  },
  cardWrapper: {
    zIndex: 1,
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: purple[400],
    padding: theme.spacing(8, 3),
  },
  cardContent: {
    maxWidth: 400,
  },
  textField: {
    width: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  button: {
    width: '100%',
  },
  backButton: {
    margin: theme.spacing(3)
  },
  helpButton: {
    backgroundColor: yellow[500],
    color: theme.palette.common.black,
  }
});

function Game(props) {
  const formValue = useRef();
  const history = useHistory();
  const { classes } = props;

  const { currentUser, logout } = useAuth();

  async function back() {
    try {
      history.push("./ChatGroups");
    } catch {}
  }

  async function Help() {
    try {
      history.push("./Help")
    } catch {}
  }

  const [userName, setUserName] = useState("");
  getUserName().then((x) => setUserName(x));

  const createFeedback = async (e) => {
    e.preventDefault();
    history.push("./Chat", { gNumber: formValue.current.value });
  };

  return (
    <>
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
      <Grid container alignItems="center"
  justify="center" m={20}>
        <Grid item xs={12} md={6} className={classes.cardWrapper}>
          <div className={classes.card}>
            <form onSubmit={createFeedback} className={classes.cardContent}>
              <Typography variant="h2" component="h2" gutterBottom>
                Game
              </Typography>
              <Typography variant="h5">
              Which country will you visit once leisure travel is allowed?
              </Typography>
              <TextField noBorder className={classes.textField} placeholder="Answer" inputRef={formValue} />
              <BoxButton type="submit" color="primary" variant="contained" className={classes.button}>
                Submit
              </BoxButton>
            </form>
          </div>
        </Grid>
        
      </Grid>
    </Container>
    </>
  );
}

async function getUserName() {
  const uid = firebase.auth().currentUser?.uid;
  const printed = await firebase.firestore().collection("users").doc(uid).get();
  return printed.data().username;
}

Game.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Game);
