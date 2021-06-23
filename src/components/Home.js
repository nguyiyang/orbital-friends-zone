import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";

export default function Home() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {}
  }

  const [groupId, setGroupId] = useState(0);
  getGroupId().then((x) => setGroupId(x));

  async function Chat() {
    try {
      if (groupId === 0) {
        history.push("./NoChat");
      } else {
        history.push("./Chat");
      }
    } catch {}
  }

  async function Forum() {
    try {
      history.push("./Forum");
    } catch {}
  }

  return (
    <div>
      <Button variant="link" onClick={handleLogout}>
        Log out
      </Button>
      <Button variant="link" onClick={Chat}>
        Chat Group
      </Button>
      <Button variant="link" onClick={Forum}>
        Forum
      </Button>
    </div>
  );
}

async function getGroupId() {
  const uid = firebase.auth().currentUser?.uid;
  const printed = await firebase.firestore().collection("users").doc(uid).get();
  return printed.data().groupId;
}
