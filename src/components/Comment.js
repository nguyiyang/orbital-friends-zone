import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";
import { useLocation } from "react-router-dom";

import { useCollectionData } from "react-firebase-hooks/firestore";

export default function Comment() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function back() {
    try {
      history.push("./Forum");
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
        <AddComment />
      </section>

      <div>
        <CommentList />
      </div>
    </div>
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
                <comments key={text.key} Comment={text} />
                {text.userID}
                <div>{text.content}</div>
                <Button
                  variant="link"
                  onClick={() =>
                    giveLike(text.id, text.likes, text.alreadyLiked)
                  }
                >
                  Like
                </Button>
                {text.likes} Likes
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
      <form onSubmit={createComment}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Comment here"
        />

        <button type="submit" disabled={!formValue}>
          ->
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
