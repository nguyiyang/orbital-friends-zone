import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";

import styles from "./Home.css";
import logOutIcon from "./Images/Logout_icon.jpg";
import forumPic from "./Images/forumPic.jpg";
import HomeImage from "./Images/HomeImage.jpg";

export default function ChatGroups() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function Home() {
    try {
      history.push("./");
    } catch {}
  }

  const [groupId, setGroupId] = useState(0);
  getGroupId().then((x) => setGroupId(x));

  async function Chat(x) {
    try {
      if (groupId === 0) {
        history.push("./NoChat");
      } else {
        history.push("./Chat", { gNumber: x });
      }
    } catch {}
  }

  async function Game() {
    try {
      history.push("./Game");
    } catch {}
  }

  return (
    <section>
      <Button variant="link" onClick={Home}>
        Back
      </Button>
      <div>
        <Button variant="link" onClick={() => Chat(-1)} className="chatButton">
          Academic Advice
        </Button>
        <Button variant="link" onClick={() => Chat(-2)} className="forumButton">
          CCA and Interests
        </Button>
        <Button variant="link" onClick={() => Chat(-3)} className="forumButton">
          Personal Life and Relationship
        </Button>
        <Button variant="link" onClick={() => Chat(-4)} className="forumButton">
          Memes only!
        </Button>
        <Button
          variant="link"
          onClick={() => Chat(groupId)}
          className="forumButton"
        >
          Matched Groups
        </Button>
        <Button variant="link" onClick={Game} className="forumButton">
          Game
        </Button>
      </div>
    </section>
  );
}

async function getGroupId() {
  const uid = firebase.auth().currentUser?.uid;
  const printed = await firebase.firestore().collection("users").doc(uid).get();
  return printed.data().groupId;
}
