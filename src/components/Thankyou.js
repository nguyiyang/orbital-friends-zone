import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";

export default function Thankyou() {
  const history = useHistory();

  async function Home() {
    try {
      history.push("./");
    } catch {}
  }

  return (
    <div>
      <div>
        <Button variant="link" onClick={Home}>
          Return to HomePage
        </Button>
      </div>
      <div>Thank you for your feedback!</div>
    </div>
  );
}
