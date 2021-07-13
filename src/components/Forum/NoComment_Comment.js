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
import { purple, yellow } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  Comments: {
    position: "relative",
    backgroundColor: purple[100],
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
  CommentsContent: {
    justifyContent: "center",
    align: "center",
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(8),
      paddingRight: 0
    }
  },
  likebutton: {
    backgroundColor: green[500],
    marginRight: theme.spacing(2)
  },
  commentbutton: {
    backgroundColor: purple[500],
    marginRight: theme.spacing(2)
  },
}));

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function Comments(props) {
  const classes = useStyles();
  const { comment } = props;

  const commentsRef = firestore.collection("Comment");

  const query = commentsRef.orderBy("createdAt", "desc");

  const [comments] = useCollectionData(query, { idField: "id" });

  const history = useHistory();

  async function giveLike(identity, numOfLikes, likedArray) {
    const currUid = await auth.currentUser.uid;
    console.log(likedArray);
    if (likedArray.includes(currUid)) {
      commentsRef.doc(identity).update({
        likes: numOfLikes - 1,
        alreadyLiked: firebase.firestore.FieldValue.arrayRemove(currUid)
      });
    } else {
      commentsRef.doc(identity).update({
        likes: numOfLikes + 1,
        alreadyLiked: firebase.firestore.FieldValue.arrayUnion(currUid)
      });
    }
  }

  async function writeComment(x) {
    try {
      history.push("./addComment", { commentId: x });
    } catch {}
  }

  function LikeorLikes(x) {
    if (x === 0 || x === 1) {
      return " like";
    } else {
      return " likes";
    }
  }

  return (
    <Paper
      className={classes.Comments}
    >
      {/* Increase the priority of the hero background image */}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={11}>
          <div className={classes.CommentsContent}>
            
            <Typography variant="body1" display="block" color="secondary">
              {comment.userID}
            </Typography>
            <Typography variant="h6" color="inherit">
              {comment.content}
            </Typography>
            <br></br>
            <Typography variant="h6" color="inherit">
              {comment.likes}
              {LikeorLikes(comment.likes)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.likebutton}
              startIcon={<ThumbUpAltIcon />}
              onClick={() => giveLike(comment.id, comment.likes, comment.alreadyLiked)}
            >
              Like
            </Button>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

Comments.propTypes = {
  comment: PropTypes.object
};