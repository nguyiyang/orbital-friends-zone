import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export default function About() {
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      history.push("/");
    } catch {}
  }

  return (
    <>
      <Card style={{ backgroundColor: "lightblue" }}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h1
                style={{ height: "10vh", fontFamily: "Bradley Hand, cursive" }}
              >
                Thank you for registering!
              </h1>
              <div
                style={{
                  height: "75vh",
                  width: "70vw",
                  margin: "auto",
                  backgroundColor: "lightgrey",
                  padding: 100,
                  borderRadius: 30,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >
                <p>Alright, everything is done!</p>
                <p>Group creation will be done from 0000 to 0100 every Monday.</p>
                <p>Now, you have to wait for the group completion to be complete. Do visit the forum to talk to others while waiting!</p>
              </div>
              <div style={{ marginLeft: "auto", marginRight: 0 }}>
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "purple",
                    borderRadius: 20,
                    height: "10vh",
                    width: "10vw",
                  }}
                >
                  Main Page
                </Button>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}