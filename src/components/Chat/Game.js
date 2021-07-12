import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";

export default function Game() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function back() {
    try {
      history.push("./ChatGroups");
    } catch {}
  }

  return (
    <div>
      <header>
        <Button variant="link" onClick={back}>
          Back
        </Button>
      </header>
      What would you like for dinner tonight?
      <section>
        <GameQ />
      </section>
    </div>
  );
}

function GameQ() {
  const [formValue, setFormValue] = useState("");

  const history = useHistory();

  const createFeedback = async (e) => {
    e.preventDefault();
    history.push("./Chat", { gNumber: formValue });
    setFormValue("");
  };

  return (
    <>
      <form onSubmit={createFeedback}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Answer"
        />
        <button type="submit" disabled={!formValue}>
          -
        </button>
      </form>
    </>
  );
}
