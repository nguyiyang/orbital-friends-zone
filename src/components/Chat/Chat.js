import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";
import { useLocation } from "react-router-dom";

import styles from "./Chat.css";

import { useCollectionData } from "react-firebase-hooks/firestore";

export default function Chat() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function Home() {
    try {
      history.push("./ChatGroups");
    } catch {}
  }

  return (
    <div
      className="Chat"
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh"
      }}
    >
      <header>
        <Button variant="link" onClick={Home} className="backButton">
          Back
        </Button>
      </header>

      <section>
        <ChatRoom />
      </section>
    </div>
  );
}

const auth = firebase.auth();
const firestore = firebase.firestore();

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("Chat");

  const query = messagesRef.orderBy("createdAt");

  const [messages] = useCollectionData(query, { idField: "id" });

  const groupNumber = useLocation().state.gNumber;

  const [formValue, setFormValue] = useState("");

  const [userName, setUserName] = useState("");
  getUserName().then((x) => setUserName(x));

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      chatGroupId: groupNumber,
      userID: userName
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  function displayName(x) {
    if (x === -1) {
      return "Academic Advice";
    } else if (x === -2) {
      return "CCA and Interests";
    } else if (x === -3) {
      return "Personal Life and Relationship";
    } else if (x === -4) {
      return "Memes only!";
    } else if (typeof x === "number") {
      return "Assigned Group";
    } else {
      return x;
    }
  }

  return (
    <>
      {displayName(groupNumber)}
      <main>
        {messages &&
          messages
            .filter((msg) => msg.chatGroupId === groupNumber)
            .map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type a message"
        />

        <button type="submit" disabled={!formValue}>
          Send
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, userID, uid } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  if (messageClass === "sent") {
    return (
      <>
        <div className={`message ${messageClass}`}>
          <p>{text}</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div id="displayedName">{userID}</div>
        <div className={`message ${messageClass}`}>
          <p>{text}</p>
        </div>
      </>
    );
  }
}

async function getGroupId() {
  const uid = firebase.auth().currentUser?.uid;
  const printed = await firebase.firestore().collection("users").doc(uid).get();
  return printed.data().groupId;
}

async function getUserName() {
  const uid = firebase.auth().currentUser?.uid;
  const printed = await firebase.firestore().collection("users").doc(uid).get();
  return printed.data().username;
}
