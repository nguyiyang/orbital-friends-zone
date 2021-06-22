import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function Home() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {}
  }

  async function Chat() {
    try {
      history.push("/Chat");
    } catch {}
  }

  async function Forum() {
    try {
      history.push("/Forum");
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

