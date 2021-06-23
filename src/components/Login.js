import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import background from "./sample.jpg";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      const uid = firebase.auth().currentUser?.uid;
      const db = firebase.firestore();
      const docRef = db.collection("users").doc(uid);

      docRef.get().then((doc) => {
        if (doc.exists) {
          if (doc.data().admin) {
            history.push("/admin");
          } else {
            history.push("/");
          }
        } else {
          history.push("/about");
        }
      });
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div>
        <div style={{ height: 50 }}></div>
        <h2
          className="text-center mb-4"
          style={{ fontSize: 50, fontFamily: "Bradley Hand, cursive" }}
        >
          {" "}
          FriendsZone
        </h2>
        <Card style={{ background: 0.1 }}>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  ref={emailRef}
                  required
                />
              </Form.Group>
              <div style={{ height: 25 }}></div>
              <Form.Group id="password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
                  required
                />
              </Form.Group>
              <div style={{ height: 25 }}></div>
              <Button
                disabled={loading}
                className="w-100"
                type="submit"
                style={{ backgroundColor: "purple", borderRadius: 20 }}
              >
                Log in
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/Signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
