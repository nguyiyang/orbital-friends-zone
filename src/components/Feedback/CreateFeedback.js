/*
import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";

export default function MakeFeedback() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function back() {
    try {
      history.push("./");
    } catch {}
  }

  return (
    <div>
      <header>
        <Button variant="link" onClick={back}>
          Back
        </Button>
      </header>

      <section>
        <AddFeedback />
      </section>
    </div>
  );
}

function AddFeedback() {
  const [formValue, setFormValue] = useState("");
  const [formValue2, setFormValue2] = useState("");
  const history = useHistory();

  const [userName, setUserName] = useState("");
  getUserName().then((x) => setUserName(x));

  const createFeedback = async (e) => {
    e.preventDefault();
    const { uid } = firebase.auth().currentUser;
    await firebase.firestore().collection("Feedback").add({
      content: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      userID: userName
    });

    setFormValue("");
    history.push("./Thankyou");
  };

  return (
    <>
      <form onSubmit={createFeedback}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="How can we improve the app?"
        />
        <button type="submit" disabled={!formValue}>
          -
        </button>
      </form>
    </>
  );
}

async function getUserName() {
  const uid = firebase.auth().currentUser?.uid;
  const printed = await firebase.firestore().collection("users").doc(uid).get();
  return printed.data().username;
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
    backgroundColor: theme.palette.warning.main,
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
});

function MakeFeedback(props) {
  const formValue = useRef();
  const history = useHistory();
  const { classes } = props;
  const [open, setOpen] = React.useState(false);

  const { currentUser, logout } = useAuth();

  async function back() {
    try {
      history.push("./");
    } catch {}
  }

  const handleClose = () => {
    setOpen(false);
  };

  const [userName, setUserName] = useState("");
  getUserName().then((x) => setUserName(x));

  const createFeedback = async (e) => {
    e.preventDefault();
    const { uid } = firebase.auth().currentUser;
    await firebase.firestore().collection("Feedback").add({
      content: formValue.current.value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      userID: userName
    });
    history.push("./Thankyou");
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
    <Container className={classes.root} component="section">
      <Grid container alignItems="center"
  justify="center" m={20}>
        <Grid item xs={12} md={6} className={classes.cardWrapper}>
          <div className={classes.card}>
            <form onSubmit={createFeedback} className={classes.cardContent}>
              <Typography variant="h2" component="h2" gutterBottom>
                Feedback
              </Typography>
              <Typography variant="h5">
              How can we improve the app?
              </Typography>
              <TextField noBorder className={classes.textField} placeholder="How can we improve the app?" inputRef={formValue} />
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

MakeFeedback.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MakeFeedback);
