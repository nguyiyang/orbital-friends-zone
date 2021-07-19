import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";
import CommentFormat from "./NoComment_Comment";
import AppBar from "../Login_Reg_Home/AppBar/MainAppBar";
import { Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useLocation } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import TextField from "@material-ui/core/TextField";
import SendIcon from '@material-ui/icons/Send';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  backButton: {
    margin: theme.spacing(3),
  },
  postButton: {
    margin: theme.spacing(3),
  },
  root: {
    display: 'flex',
    padding: '2px 4px',
    position: 'relative',
    alignItems: 'center',
    width: "50%",
    marginLeft:  "25%",
    align: 'center',
    justifyContent: "center",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton:{
    marginRight: 1,
    padding: 10,
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
        style={{ width: "100%", position: "relative" }}
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
        <br></br>
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
        alreadyLiked: firebase.firestore.FieldValue.arrayRemove(currUid),
      });
    } else {
      commentsRef.doc(identity).update({
        likes: numOfLikes + 1,
        alreadyLiked: firebase.firestore.FieldValue.arrayUnion(currUid),
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
      </main>
    </>
  );
}

function AddComment() {
  const formValue = useRef();
  const history = useHistory();
  const classes = useStyles();
  const postIdentifier = useLocation().state.postId;

  async function back() {
    try {
      history.push("./Forum");
    } catch {}
  }

  const [userName, setUserName] = useState("");
  getUserName().then((x) => setUserName(x));

  const [btnDisabled, setBtnDisabled] = useState(true);

  const createComment = async (e) => {
    e.preventDefault();

    const { uid } = firebase.auth().currentUser;

    await firebase.firestore().collection("Comment").add({
      content: formValue.current.value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      likes: 0,
      alreadyLiked: [],
      postOwner: postIdentifier,
      userID: userName,
    });
  };

  return (
    <>
      <Paper component="form" className={classes.root} onSubmit={createComment}>
      <InputBase
        className={classes.input}
        placeholder="Comment here"
        inputRef={formValue}
        onChange={(text) => setBtnDisabled(!text.target.value)}
        multiline
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search" disabled={btnDisabled} >
        <SendIcon />
      </IconButton>
      </Paper>
    </>
  );
}

async function getUserName() {
  const uid = firebase.auth().currentUser?.uid;
  const printed = await firebase.firestore().collection("users").doc(uid).get();
  return printed.data().username;
}


/*
<Container justifyContent="center" align="center" maxWidth="sm">
        <form onSubmit={createComment}>
          <TextField
            id="filled-textarea"
            label="Comment here"
            inputRef={formValue}
            multiline
            variant="filled"
            justifyContent="center"
            size="small"
            onChange={(text) => setBtnDisabled(!text.target.value)}
          />
          <Button
            type="submit"
            disabled={!formValue}
            position="relative"
            variant="contained"
            color="primary"
            size="large"
            disabled={btnDisabled}
          >
            Submit
          </Button>
        </form>
      </Container>
    */