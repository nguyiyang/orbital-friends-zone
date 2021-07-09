import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";

import styles from "./Home.css";
import logOutIcon from "./Images/Logout_icon.jpg";
import forumPic from "./Images/forumPic.jpg";
import HomeImage from "./Images/HomeImage.jpg";

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
    <section className="hello">
      <Button variant="link" onClick={handleLogout} className="logOutButton">
        <img src={logOutIcon} alt="Picnic" width="50px" height="50px" />
      </Button>
      <div className="asdf">
        <Button variant="link" onClick={Chat} className="chatButton">
          <img src={HomeImage} />
        </Button>
        <Button variant="link" onClick={Forum} className="forumButton">
          <img src={forumPic} />
        </Button>
      </div>
    </section>
  );
}

async function getGroupId() {
  const uid = firebase.auth().currentUser?.uid;
  const printed = await firebase.firestore().collection("testusers").doc(uid).get();
  return printed.data().groupId;
}
