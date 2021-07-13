import React, { useRef, useState } from "react";
import { Form, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";
import AnnounFormat from "./NoLikeNoComment";
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
  announButton: {
    margin: theme.spacing(3)
  },

}));

export default function Announcement() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const classes = useStyles();

  async function Home() {
    try {
      history.push("./");
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
        zIndex="tooltip"
      >
        Announcement
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
          <ShowForum />
        </section>
      </div>
    </>
  );
}

const auth = firebase.auth();
const firestore = firebase.firestore();

function ShowForum() {
  const announRef = firestore.collection("Announcement");
  const query = announRef.orderBy("createdAt", "desc");
  const [announs] = useCollectionData(query, { idField: "id" });

  return (
    <>
      <main>
        {announs &&
          announs.map((text) => (
            <div>
              <AnnounFormat announcements={text} />
            </div>
          ))}
      </main>
    </>
  );
}
