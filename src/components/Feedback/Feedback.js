import React, { useRef, useState } from "react";
import { Form, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";
import FBFormat from "./NoLikeNoComment_FB";
import AppBar from "../Login_Reg_Home/AppBar/MainAppBar";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';

import { useCollectionData } from "react-firebase-hooks/firestore";

const useStyles = makeStyles((theme) => ({
  backButton: {
    margin: theme.spacing(3)
  },
  fbButton: {
    margin: theme.spacing(3)
  }
}));

export default function Feedback() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const classes = useStyles();

  async function Home() {
    try {
      history.push("./Admin");
    } catch {}
  }

  return (
    <>
      <AppBar />
      <Typography
      component="div"
      variant="body1"
      style={{ width: '100%', position: 'relative' }}
    >
      <Box
        bgcolor="grey.700"
        color="white"
        p={2}
        position="static"
        top={0}
        left="47.5%"
        zIndex="tooltip"
      >
        Feedback
      </Box>
      </Typography>
      <div>
        <header>
          <Button
            variant="outlined"
            color="inherit"
            className={classes.backButton}
            onClick={Home}
          >
            Back
          </Button>
        </header>

        <section>
          <ShowFB />
        </section>
      </div>
    </>
  );
}

const auth = firebase.auth();
const firestore = firebase.firestore();

function ShowFB() {
  const fbRef = firestore.collection("Feedback");
  const query = fbRef.orderBy("createdAt", "desc");
  const [fbs] = useCollectionData(query, { idField: "id" });

  return (
    <>
      <main>
        {fbs &&
          fbs.map((text) => (
            <div>
              <FBFormat feedbacks={text} />
            </div>
          ))}
      </main>
    </>
  );
}
