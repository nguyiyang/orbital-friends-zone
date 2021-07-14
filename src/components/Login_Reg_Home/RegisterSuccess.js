import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";
import { Box, Container, Typography, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../Login_Reg_Home/AppBar/MainAppBar";
import PeepoClap from "./../Images/peepoClap.gif";
import { yellow } from "@material-ui/core/colors";

const styles = (theme) => ({
  whole:{
    display: 'flex',
    backgroundColor: yellow[200],
    height: "100%",
  },
  root: {

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(30),
    marginBottom: theme.spacing(41),
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
        <img src={PeepoClap} className={classes.buoy} alt="buoy" />
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



/*
import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export default function About() {
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      history.push("/");
    } catch {}
  }

  return (
    <>
      <Card style={{ backgroundColor: "lightblue" }}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h1
                style={{ height: "10vh", fontFamily: "Bradley Hand, cursive" }}
              >
                Thank you for registering!
              </h1>
              <div
                style={{
                  height: "75vh",
                  width: "70vw",
                  margin: "auto",
                  backgroundColor: "lightgrey",
                  padding: 100,
                  borderRadius: 30,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  fontSize: 25
                }}
              >
                <p>Alright, everything is done!</p>
                <p>Group creation will be done from 0000 to 0100 every Monday.</p>
                <p>Now, you have to wait for the group completion to be complete. Do visit the forum to talk to others while waiting!</p>
              </div>
              <div style={{ marginLeft: "auto", marginRight: 0 }}>
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "purple",
                    borderRadius: 20,
                    height: "10vh",
                    width: "10vw",
                  }}
                >
                  Main Page
                </Button>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
*/