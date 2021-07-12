import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";

export default function MakeAnnouncement() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function back() {
    try {
      history.push("./Admin");
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
        <AddAnnouncement />
      </section>
    </div>
  );
}

function AddAnnouncement() {
  const [formValue, setFormValue] = useState("");
  const [formValue2, setFormValue2] = useState("");
  const history = useHistory();

  const [userName, setUserName] = useState("");
  getUserName().then((x) => setUserName(x));

  const createAnnouncement = async (e) => {
    e.preventDefault();
    const { uid } = firebase.auth().currentUser;
    await firebase.firestore().collection("Announcement").add({
      title: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      content: formValue2,
      userID: userName
    });

    setFormValue("");
  };

  return (
    <>
      <form onSubmit={createAnnouncement}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Title"
        />
        <input
          value={formValue2}
          onChange={(e) => setFormValue2(e.target.value)}
          placeholder="Content"
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
