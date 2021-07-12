import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";
import MainFeaturedPost from './MainFeaturedPost';

import { useCollectionData } from "react-firebase-hooks/firestore";

export default function Forum() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function Home() {
    try {
      history.push("./");
    } catch {}
  }

  async function addPost() {
    try {
      history.push("./addPost");
    } catch {}
  }

  return (
    <div>
      <header>
        <Button variant="link" onClick={Home}>
          Back
        </Button>
        <Button variant="link" onClick={addPost}>
          Create Post
        </Button>
      </header>

      <section>
        <ShowForum />
      </section>
    </div>
  );
}

const auth = firebase.auth();
const firestore = firebase.firestore();

function ShowForum() {
  const dummy = useRef();
  const postRef = firestore.collection("Forum");

  const query = postRef.orderBy("createdAt", "desc");

  const [posts] = useCollectionData(query, { idField: "id" });

  const history = useHistory();

  async function writeComment(x) {
    try {
      history.push("./addComment", { postId: x });
    } catch {}
  }

  async function giveLike(identity, numOfLikes, likedArray) {
    const currUid = await auth.currentUser.uid;
    console.log(likedArray);
    if (likedArray.includes(currUid)) {
      postRef.doc(identity).update({
        likes: numOfLikes - 1,
        alreadyLiked: firebase.firestore.FieldValue.arrayRemove(currUid)
      });
    } else {
      postRef.doc(identity).update({
        likes: numOfLikes + 1,
        alreadyLiked: firebase.firestore.FieldValue.arrayUnion(currUid)
      });
    }
  }

  return (
    <>
      <main>
        {posts &&
          posts.map((text) => (
            <div>
              <MainFeaturedPost post={text} />
            </div>
          ))}

        <span ref={dummy}></span>
      </main>
    </>
  );
}




/*
<Post key={text.key} post={text} />
              <div>{text.userID}</div>
              <div>{text.title}</div>
              <div>{text.content}</div>
              <Button variant="link" onClick={() => writeComment(text.id)}>
                Comment
              </Button>
              <Button
                variant="link"
                onClick={() => giveLike(text.id, text.likes, text.alreadyLiked)}
              >
                Like
              </Button>
              {text.likes} Likes
              */