import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";

import { useCollectionData } from "react-firebase-hooks/firestore";

export default function forum() {
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
        <Forum />
      </section>
    </div>
  );
}

const auth = firebase.auth();
const firestore = firebase.firestore();

function Forum() {
  const dummy = useRef();
  const postRef = firestore.collection("Forum");

  const query = postRef.orderBy("createdAt", "desc");

  const [posts] = useCollectionData(query, { idField: "id" });

  return (
    <>
      <main>
        {posts &&
          posts.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid } = props.message;

  return (
    <div>
      <p>{text}</p>
    </div>
  );
}
