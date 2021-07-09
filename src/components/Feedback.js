import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";

import { useCollectionData } from "react-firebase-hooks/firestore";

export default function Announcment() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function Home() {
    try {
      history.push("./Admin");
    } catch {}
  }

  return (
    <div>
      <header>
        <Button variant="link" onClick={Home}>
          Back
        </Button>
      </header>

      <section>
        <ShowFeedback />
      </section>
    </div>
  );
}

const auth = firebase.auth();
const firestore = firebase.firestore();

function ShowFeedback() {
  const dummy = useRef();
  const FeedbackRef = firestore.collection("Feedback");

  const query = FeedbackRef.orderBy("createdAt", "desc");

  const [Feedbacks] = useCollectionData(query, { idField: "id" });

  const history = useHistory();

  return (
    <>
      <main>
        {Feedbacks &&
          Feedbacks.map((text) => (
            <div>
              <fdb key={text.id} FDB={text} />
              <div>{text.userID}</div>
              <div>{text.content}</div>
            </div>
          ))}
        <span ref={dummy}></span>
      </main>
    </>
  );
}

function fdb(props) {
  const { text, uid } = props.FDB;

  return (
    <div>
      <p>{text}</p>
    </div>
  );
}
