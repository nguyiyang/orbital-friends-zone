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
                  width: "70vw",
                  margin: "auto",
                  backgroundColor: "lightgrey",
                  padding: 100,
                  borderRadius: 30,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  fontSize: 25
                }}
              >
                <p>Creator's note:</p>
                <p>
                  Welcome! This is FriendsZone, a project to bring together
                  like-minded students in NUS to help forge lasting friendships.
                  Our project helps place you with three other like-minded users
                  into groups of four. From there on, you can mingle with your
                  groupmates or visit the forum to get to know even more people!
                </p>
                <p>
                  But firstly, we would need to get to know you a little better
                  :). Whenever you are ready, please click on "Continue" to
                  proceed to the questionnaire where we can assess your
                  compatibality with other users.
                </p>
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
                  Continue
                </Button>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
