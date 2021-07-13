import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";
import CommentFormat from "./NoComment_Comment";
import AppBar from "../Login_Reg_Home/AppBar/MainAppBar";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import { useLocation } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  backButton: {
    margin: theme.spacing(3)
  },
  postButton: {
    margin: theme.spacing(3)
  }
}));

export default function Comment() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const classes = useStyles();

  async function back() {
    try {
      history.push("./Forum");
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
          Comment
        </Box>
        </Typography>
        <div>
          <header>
            <Button
              variant="outlined"
              color="inherit"
              className={classes.backButton}
              onClick={back}
            >
              Back
            </Button>
          
          </header>
          <AddComment />
          <section>
            <CommentList />
          </section>
        </div>
      </>
    );
}

const auth = firebase.auth();
const firestore = firebase.firestore();

function CommentList() {
  const dummy = useRef();
  const commentsRef = firestore.collection("Comment");
  const query = commentsRef.orderBy("createdAt", "desc");
  const [comments] = useCollectionData(query, { idField: "id" });

  const postIdentifier = useLocation().state.postId;

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

  return (
    <>
      <main>
        {comments &&
          comments
            .filter((cm) => cm.postOwner === postIdentifier)
            .map((text) => (
              <div>
              <CommentFormat comment={text} />
              </div>
            ))}

        <span ref={dummy}></span>
      </main>
    </>
  );
}

function AddComment() {
  const [formValue, setFormValue] = useState("");
  const history = useHistory();

  const postIdentifier = useLocation().state.postId;

  async function back() {
    try {
      history.push("./Forum");
    } catch {}
  }

  const [userName, setUserName] = useState("");
  getUserName().then((x) => setUserName(x));

  const createComment = async (e) => {
    e.preventDefault();

    const { uid } = firebase.auth().currentUser;

    await firebase.firestore().collection("Comment").add({
      content: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      likes: 0,
      alreadyLiked: [],
      postOwner: postIdentifier,
      userID: userName
    });

    setFormValue("");
  };

  return (
    <>
      <TextField onSubmit={createComment}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Comment here"
        />

        <button type="submit" disabled={!formValue}>
          ->
        </button>
      </TextField>
      
    </>
  );
}

async function getUserName() {
  const uid = firebase.auth().currentUser?.uid;
  const printed = await firebase.firestore().collection("users").doc(uid).get();
  return printed.data().username;
}
