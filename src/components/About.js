import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export default function About() {
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      history.push("/regform");
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
                Welcome to FriendsZone!
              </h1>
              <div
                style={{
                  height: "75vh",
                  textAlign: "center",
                  backgroundColor: "lightgrey",
                }}
              >
                Creator's note
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
                  Proceed
                </Button>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
