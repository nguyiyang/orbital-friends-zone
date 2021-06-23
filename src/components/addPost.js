import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";

export default function addPost() {
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
        <AddPost />
      </section>
    </div>
  );
}

function AddPost() {
  const [formValue, setFormValue] = useState("");

  async function back() {
    try {
      history.push("./Forum");
    } catch {}
  }

  const createPost = async (e) => {
    e.preventDefault();
    const { uid } = firebase.auth().currentUser;
    await firebase.firestore().collection("Forum").add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      likes: 0,
      comments: {}
    });

    setFormValue("");
  };

  return (
    <>
      <form onSubmit={createPost && back}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type a message"
        />

        <button type="submit" disabled={!formValue}>
          ->
        </button>
      </form>
    </>
  );
}
