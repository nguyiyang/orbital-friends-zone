import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";

import { useCollectionData } from "react-firebase-hooks/firestore";

export default function Chat() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function Home() {
    try {
      history.push("./");
    } catch {}
  }

  return (
    <div className="Chat">
      <header>
        <Button variant="link" onClick={Home}>
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
  // groupId of current user
  const [groupId, setGroupId] = useState(0);
  getGroupId().then((x) => setGroupId(x));
  const query = messagesRef.orderBy("createdAt");

  const [messages] = useCollectionData(query, { idField: "id" });
  console.log(messages)

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid } = auth.currentUser;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      chatGroupId: groupId
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.filter((msg) => msg.chatGroupId === groupId).map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type a message"
        />

        <button type="submit" disabled={!formValue}>
          =
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <p>{text}</p>
      </div>
    </>
  );
}

async function getGroupId() {
  const uid = firebase.auth().currentUser?.uid;
  const printed = await firebase.firestore().collection("users").doc(uid).get();
  return printed.data().groupId;
}
