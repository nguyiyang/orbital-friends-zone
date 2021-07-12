import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";

export default function ExitGroupCompleted() {
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
      <div>Exit Group Successful</div>
    </div>
  );
}
