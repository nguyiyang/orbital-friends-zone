import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";

export default function MakeFeedback() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function back() {
    try {
      history.push("./");
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
        <AddFeedback />
      </section>
    </div>
  );
}

function AddFeedback() {
  const [formValue, setFormValue] = useState("");
  const [formValue2, setFormValue2] = useState("");
  const history = useHistory();

  const [userName, setUserName] = useState("");
  getUserName().then((x) => setUserName(x));

  const createFeedback = async (e) => {
    e.preventDefault();
    const { uid } = firebase.auth().currentUser;
    await firebase.firestore().collection("Feedback").add({
      content: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      userID: userName
    });

    setFormValue("");
    //history.push("./Thankyou");
  };

  return (
    <>
      <form onSubmit={createFeedback}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="How can we improve the app?"
        />
        <button type="submit" disabled={!formValue}>
          -
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
