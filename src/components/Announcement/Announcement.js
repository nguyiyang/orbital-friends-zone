import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";

import { useCollectionData } from "react-firebase-hooks/firestore";

export default function Announcment() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function Home() {
    try {
      history.push("./");
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
        <ShowAnnouncement />
      </section>
    </div>
  );
}

const auth = firebase.auth();
const firestore = firebase.firestore();

function ShowAnnouncement() {
  const dummy = useRef();
  const announcementRef = firestore.collection("Announcement");

  const query = announcementRef.orderBy("createdAt", "desc");

  const [announcements] = useCollectionData(query, { idField: "id" });

  const history = useHistory();

  return (
    <>
      <main>
        {announcements &&
          announcements.map((text) => (
            <div>
              <Anm key={text.id} anm={text} />
              <div>{text.userID}</div>
              <div>{text.title}</div>
              <div>{text.content}</div>
            </div>
          ))}
        <span ref={dummy}></span>
      </main>
    </>
  );
}

function Anm(props) {
  const { text, uid } = props.anm;

  return (
    <div>
      <p>{text}</p>
    </div>
  );
}
