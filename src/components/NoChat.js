import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";

export default function NoChat() {
  const history = useHistory();

  async function Home() {
    try {
      history.push("./ChatGroups");
    } catch {}
  }

  return (
    <div>
      <div>
        <Button variant="link" onClick={Home}>
          Back
        </Button>
      </div>
      <div>
        You have not been assigned a group. 😞 Group Creation will be done from
        0000-0600 every Monday. Check again later!
      </div>
    </div>
  );
}
