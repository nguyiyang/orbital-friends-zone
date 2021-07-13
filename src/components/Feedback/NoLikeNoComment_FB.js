import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import blue from "@material-ui/core/colors/cyan";
import Button from "@material-ui/core/Button";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import React, { useRef, useState } from "react";
import { Form, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import green from "@material-ui/core/colors/green";
import { purple, yellow} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  Feedback: {
    position: "relative",
    backgroundColor: green[50],
    color: theme.palette.common.black,
    marginBottom: theme.spacing(3),
    backgroundSize: "85% 85%",
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },
  FeedbackContent: {
    justifyContent: "center",
    align: "center",
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(8),
      paddingRight: 0
    }
  },
}));

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function Feedback(props) {
  const classes = useStyles();
  const { feedbacks } = props;
  const history = useHistory();

  return (
    <Paper
      className={classes.Feedback}
    >
      {/* Increase the priority of the hero background image */}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={11}>
          <div className={classes.FeedbackContent}>
            <Typography variant="h6" color="inherit">
              {feedbacks.content}
            </Typography>
            <Typography variant="body1" display="block" color="secondary">
              {"by "}
              {feedbacks.userID}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

Feedback.propTypes = {
  feedbacks: PropTypes.object
};