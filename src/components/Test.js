/*
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Main from "./Test1";
import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3)
  }
}));

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function Blog() {
  const classes = useStyles();
  
  const postRef = firestore.collection("Forum");
  const query = postRef.orderBy("createdAt", "desc");
  const posts = useCollectionData(query, { idField: "id" });

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Main title="From the firehose" posts={posts} />
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
}
*/
