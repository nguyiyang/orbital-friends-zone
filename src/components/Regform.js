import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { Link, useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

export default function Regform() {
  const usernameRef = useRef();
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [value4, setValue4] = useState(0);
  const [value5, setValue5] = useState(0);
  const [value6, setValue6] = useState(0);
  const [value7, setValue7] = useState(0);
  const [value8, setValue8] = useState(0);
  const [value9, setValue9] = useState(0);
  const [value10, setValue10] = useState(0);
  const [value11, setValue11] = useState(0);
  const [value12, setValue12] = useState(0);
  const [value13, setValue13] = useState(0);
  const [value14, setValue14] = useState(0);
  const [value15, setValue15] = useState(0);
  const [value16, setValue16] = useState(0);
  const [value17, setValue17] = useState(0);
  const [value18, setValue18] = useState(0);
  const [value19, setValue19] = useState(0);
  const [value20, setValue20] = useState(0);
  const handleChange1 = (val) => setValue1(val);
  const handleChange2 = (val) => setValue2(val);
  const handleChange3 = (val) => setValue3(val);
  const handleChange4 = (val) => setValue4(val);
  const handleChange5 = (val) => setValue5(val);
  const handleChange6 = (val) => setValue6(val);
  const handleChange7 = (val) => setValue7(val);
  const handleChange8 = (val) => setValue8(val);
  const handleChange9 = (val) => setValue9(val);
  const handleChange10 = (val) => setValue10(val);
  const handleChange11 = (val) => setValue11(val);
  const handleChange12 = (val) => setValue12(val);
  const handleChange13 = (val) => setValue13(val);
  const handleChange14 = (val) => setValue14(val);
  const handleChange15 = (val) => setValue15(val);
  const handleChange16 = (val) => setValue16(val);
  const handleChange17 = (val) => setValue17(val);
  const handleChange18 = (val) => setValue18(val);
  const handleChange19 = (val) => setValue19(val);
  const handleChange20 = (val) => setValue20(val);
  const history = useHistory();

  const uid = firebase.auth().currentUser?.uid;
  const db = firebase.firestore();

  const [users, setUsers] = useState(0);
  const countUsers = () =>
    db
      .collection("users")
      .get()
      .then((snap) => {
        setUsers(snap.size); // will return the collection size
      });
  useEffect(() => {
    countUsers();
  }, []);

  function generateScore() {
    const score1 =
      value1 +
      value2 +
      value3 +
      value4 +
      value5 +
      value6 +
      value7 +
      value8 +
      value9 +
      value10;
    const score2 =
      value11 +
      value12 +
      value13 +
      value14 +
      value15 +
      value16 +
      value17 +
      value18 +
      value19 +
      value20;
    // save to database here
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/users").doc(uid).set(
      {
        id: users,
        username: usernameRef.current.value,
        admin: false,
        score1: score1,
        score2: score2,
        groupId: 0,
      },
      { merge: true }
    );
    history.push("/");
  }

  return (
    <>
      <Card style={{ backgroundColor: "lightblue" }}>
        <Card.Body>
          <h1 style={{ fontFamily: "Bradley Hand, cursive" }}> FriendsZone </h1>
          <Form onSubmit={generateScore}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                backgroundColor: "lightgrey",
                padding: 30,
                borderRadius: 20,
              }}
            >
              <Form.Group id="username">
                <Form.Label> Username</Form.Label>
                <Form.Control
                  style={{ width: "50vw" }}
                  type="username"
                  ref={usernameRef}
                  required
                />
              </Form.Group>
              <br></br>
              <p style={{ fontWeight: "bold", width: "70vw" }}>
                {" "}
                Please answer the following questions as truthfully as possible
                to ensure that our matching is accurate. 1 will indicate that
                you cannot relate to the statement at all while 5 means that the
                sentence describes you perfectly.{" "}
              </p>
              <Form.Group id="q1">
                <Form.Label> You regularly make new friends.</Form.Label>
                <br></br>
                <ToggleButtonGroup
                  name="value1"
                  type="radio"
                  value={value1}
                  onChange={handleChange1}
                >
                  <ToggleButton value={1}>1</ToggleButton>
                  <ToggleButton value={2}>2</ToggleButton>
                  <ToggleButton value={3}>3</ToggleButton>
                  <ToggleButton value={4}>4</ToggleButton>
                  <ToggleButton value={5}>5</ToggleButton>
                </ToggleButtonGroup>
              </Form.Group>
              <br></br>
              <Form.Group id="q2">
                <Form.Label>
                  {" "}
                  At social event, you will try to introduce yourself to new
                  people
                </Form.Label>
                <br></br>
                <ToggleButtonGroup
                  name="value2"
                  type="radio"
                  value={value2}
                  onChange={handleChange2}
                >
                  <ToggleButton value={1}>1</ToggleButton>
                  <ToggleButton value={2}>2</ToggleButton>
                  <ToggleButton value={3}>3</ToggleButton>
                  <ToggleButton value={4}>4</ToggleButton>
                  <ToggleButton value={5}>5</ToggleButton>
                </ToggleButtonGroup>
              </Form.Group>
              <br></br>
              <Form.Group id="q3">
                <Form.Label>
                  {" "}
                  You feel comfortable just walking up to someone you find
                  interesting and striking up a conversation
                </Form.Label>
                <br></br>
                <ToggleButtonGroup
                  name="value3"
                  type="radio"
                  value={value3}
                  onChange={handleChange3}
                >
                  <ToggleButton value={1}>1</ToggleButton>
                  <ToggleButton value={2}>2</ToggleButton>
                  <ToggleButton value={3}>3</ToggleButton>
                  <ToggleButton value={4}>4</ToggleButton>
                  <ToggleButton value={5}>5</ToggleButton>
                </ToggleButtonGroup>
              </Form.Group>
              <br></br>
              <Form.Group id="q4">
                <Form.Label>
                  {" "}
                  In a group, you are usually the one initiating meetups
                </Form.Label>
                <br></br>
                <ToggleButtonGroup
                  name="value4"
                  type="radio"
                  value={value4}
                  onChange={handleChange4}
                >
                  <ToggleButton value={1}>1</ToggleButton>
                  <ToggleButton value={2}>2</ToggleButton>
                  <ToggleButton value={3}>3</ToggleButton>
                  <ToggleButton value={4}>4</ToggleButton>
                  <ToggleButton value={5}>5</ToggleButton>
                </ToggleButtonGroup>
              </Form.Group>
              <br></br>
              <Form.Group id="q5">
                <Form.Label>
                  {" "}
                  In your free time, you are more likely to hangout with your
                  friends than to hangout alone
                </Form.Label>
                <br></br>
                <ToggleButtonGroup
                  name="value5"
                  type="radio"
                  value={value5}
                  onChange={handleChange5}
                >
                  <ToggleButton value={1}>1</ToggleButton>
                  <ToggleButton value={2}>2</ToggleButton>
                  <ToggleButton value={3}>3</ToggleButton>
                  <ToggleButton value={4}>4</ToggleButton>
                  <ToggleButton value={5}>5</ToggleButton>
                </ToggleButtonGroup>
              </Form.Group>
              <br></br>
              <Form.Group id="q6">
                <Form.Label> You cannot stand eating alone</Form.Label>
                <br></br>
                <ToggleButtonGroup
                  name="value6"
                  type="radio"
                  value={value6}
                  onChange={handleChange6}
                >
                  <ToggleButton value={1}>1</ToggleButton>
                  <ToggleButton value={2}>2</ToggleButton>
                  <ToggleButton value={3}>3</ToggleButton>
                  <ToggleButton value={4}>4</ToggleButton>
                  <ToggleButton value={5}>5</ToggleButton>
                </ToggleButtonGroup>
              </Form.Group>
              <br></br>
              <Form.Group id="q7">
                <Form.Label>
                  {" "}
                  Given a choice between partying and spending some alone time,
                  you would prefer the former most of the time
                </Form.Label>
                <br></br>
                <ToggleButtonGroup
                  name="value7"
                  type="radio"
                  value={value7}
                  onChange={handleChange7}
                >
                  <ToggleButton value={1}>1</ToggleButton>
                  <ToggleButton value={2}>2</ToggleButton>
                  <ToggleButton value={3}>3</ToggleButton>
                  <ToggleButton value={4}>4</ToggleButton>
                  <ToggleButton value={5}>5</ToggleButton>
                </ToggleButtonGroup>
              </Form.Group>
              <br></br>
              <Form.Group id="q8">
                <Form.Label>
                  {" "}
                  You cannot be left out in a group discussion
                </Form.Label>
                <br></br>
                <ToggleButtonGroup
                  name="value8"
                  type="radio"
                  value={value8}
                  onChange={handleChange8}
                >
                  <ToggleButton value={1}>1</ToggleButton>
                  <ToggleButton value={2}>2</ToggleButton>
                  <ToggleButton value={3}>3</ToggleButton>
                  <ToggleButton value={4}>4</ToggleButton>
                  <ToggleButton value={5}>5</ToggleButton>
                </ToggleButtonGroup>
              </Form.Group>
              <br></br>
              <Form.Group id="q9">
                <Form.Label>
                  {" "}
                  You are happy to start the conversation in a group setting
                </Form.Label>
                <br></br>
                <ToggleButtonGroup
                  name="value9"
                  type="radio"
                  value={value9}
                  onChange={handleChange9}
                >
                  <ToggleButton value={1}>1</ToggleButton>
                  <ToggleButton value={2}>2</ToggleButton>
                  <ToggleButton value={3}>3</ToggleButton>
                  <ToggleButton value={4}>4</ToggleButton>
                  <ToggleButton value={5}>5</ToggleButton>
                </ToggleButtonGroup>
              </Form.Group>
              <br></br>
              <Form.Group id="q10">
                <Form.Label>
                  {" "}
                  You often take the lead in decision making within a group
                </Form.Label>
                <br></br>
                <ToggleButtonGroup
                  name="value10"
                  type="radio"
                  value={value10}
                  onChange={handleChange10}
                >
                  <ToggleButton value={1}>1</ToggleButton>
                  <ToggleButton value={2}>2</ToggleButton>
                  <ToggleButton value={3}>3</ToggleButton>
                  <ToggleButton value={4}>4</ToggleButton>
                  <ToggleButton value={5}>5</ToggleButton>
                </ToggleButtonGroup>
              </Form.Group>
              <br></br>
              <Form.Group id="q11">
                <Form.Label>
                  {" "}
                  You describe yourself as a rational human being
                </Form.Label>
                <br></br>
                <ToggleButtonGroup
                  name="value11"
                  type="radio"
                  value={value11}
                  onChange={handleChange11}
                >
                  <ToggleButton value={1}>1</ToggleButton>
                  <ToggleButton value={2}>2</ToggleButton>
                  <ToggleButton value={3}>3</ToggleButton>
                  <ToggleButton value={4}>4</ToggleButton>
                  <ToggleButton value={5}>5</ToggleButton>
                </ToggleButtonGroup>
              </Form.Group>
              <br></br>
              <Form.Group id="q12">
                <Form.Label>
                  {" "}
                  Most of the time, emotions are more important than facts in
                  your opinion
                </Form.Label>
                <br></br>
                <ToggleButtonGroup
                  name="value12"
                  type="radio"
                  value={value12}
                  onChange={handleChange12}
                >
                  <ToggleButton value={1}>1</ToggleButton>
                  <ToggleButton value={2}>2</ToggleButton>
                  <ToggleButton value={3}>3</ToggleButton>
                  <ToggleButton value={4}>4</ToggleButton>
                  <ToggleButton value={5}>5</ToggleButton>
                </ToggleButtonGroup>
              </Form.Group>
              <br></br>
              <Form.Group id="q13">
                <Form.Label>
                  {" "}
                  You usually prefer just doing what you feel like at any given
                  moment instead of planning a particular daily routine
                </Form.Label>
                <br></br>
                <ToggleButtonGroup
                  name="value13"
                  type="radio"
                  value={value13}
                  onChange={handleChange13}
                >
                  <ToggleButton value={1}>1</ToggleButton>
                  <ToggleButton value={2}>2</ToggleButton>
                  <ToggleButton value={3}>3</ToggleButton>
                  <ToggleButton value={4}>4</ToggleButton>
                  <ToggleButton value={5}>5</ToggleButton>
                </ToggleButtonGroup>
              </Form.Group>
              <br></br>
              <Form.Group id="q14">
                <Form.Label>
                  {" "}
                  You will help anyone in need at your own expense
                </Form.Label>
                <br></br>
                <ToggleButtonGroup
                  name="value14"
                  type="radio"
                  value={value14}
                  onChange={handleChange14}
                >
                  <ToggleButton value={1}>1</ToggleButton>
                  <ToggleButton value={2}>2</ToggleButton>
                  <ToggleButton value={3}>3</ToggleButton>
                  <ToggleButton value={4}>4</ToggleButton>
                  <ToggleButton value={5}>5</ToggleButton>
                </ToggleButtonGroup>
              </Form.Group>
              <br></br>
              <Form.Group id="q15">
                <Form.Label>
                  {" "}
                  In an argument with your friend, you think that the fact is
                  less important than the feelings of your friend
                </Form.Label>
                <br></br>
                <ToggleButtonGroup
                  name="value15"
                  type="radio"
                  value={value15}
                  onChange={handleChange15}
                >
                  <ToggleButton value={1}>1</ToggleButton>
                  <ToggleButton value={2}>2</ToggleButton>
                  <ToggleButton value={3}>3</ToggleButton>
                  <ToggleButton value={4}>4</ToggleButton>
                  <ToggleButton value={5}>5</ToggleButton>
                </ToggleButtonGroup>
              </Form.Group>
              <br></br>
              <Form.Group id="q16">
                <Form.Label>
                  {" "}
                  You will let your emotions of a situation disrupt your
                  workflow
                </Form.Label>
                <br></br>
                <ToggleButtonGroup
                  name="value16"
                  type="radio"
                  value={value16}
                  onChange={handleChange16}
                >
                  <ToggleButton value={1}>1</ToggleButton>
                  <ToggleButton value={2}>2</ToggleButton>
                  <ToggleButton value={3}>3</ToggleButton>
                  <ToggleButton value={4}>4</ToggleButton>
                  <ToggleButton value={5}>5</ToggleButton>
                </ToggleButtonGroup>
              </Form.Group>
              <br></br>
              <Form.Group id="q17">
                <Form.Label>
                  {" "}
                  When knowing that you have the optimal solution, you will
                  still consult everyone involved to ensure that everyone is
                  agreeable
                </Form.Label>
                <br></br>
                <ToggleButtonGroup
                  name="value17"
                  type="radio"
                  value={value17}
                  onChange={handleChange17}
                >
                  <ToggleButton value={1}>1</ToggleButton>
                  <ToggleButton value={2}>2</ToggleButton>
                  <ToggleButton value={3}>3</ToggleButton>
                  <ToggleButton value={4}>4</ToggleButton>
                  <ToggleButton value={5}>5</ToggleButton>
                </ToggleButtonGroup>
              </Form.Group>
              <br></br>
              <Form.Group id="q18">
                <Form.Label>
                  {" "}
                  You try to avoid conflict at all costs, even when you are in
                  the right
                </Form.Label>
                <br></br>
                <ToggleButtonGroup
                  name="value18"
                  type="radio"
                  value={value18}
                  onChange={handleChange18}
                >
                  <ToggleButton value={1}>1</ToggleButton>
                  <ToggleButton value={2}>2</ToggleButton>
                  <ToggleButton value={3}>3</ToggleButton>
                  <ToggleButton value={4}>4</ToggleButton>
                  <ToggleButton value={5}>5</ToggleButton>
                </ToggleButtonGroup>
              </Form.Group>
              <br></br>
              <Form.Group id="q19">
                <Form.Label> You value Harmony the most</Form.Label>
                <br></br>
                <ToggleButtonGroup
                  name="value19"
                  type="radio"
                  value={value19}
                  onChange={handleChange19}
                >
                  <ToggleButton value={1}>1</ToggleButton>
                  <ToggleButton value={2}>2</ToggleButton>
                  <ToggleButton value={3}>3</ToggleButton>
                  <ToggleButton value={4}>4</ToggleButton>
                  <ToggleButton value={5}>5</ToggleButton>
                </ToggleButtonGroup>
              </Form.Group>
              <br></br>
              <Form.Group id="q20">
                <Form.Label>
                  {" "}
                  When making an important life decision, you consider your
                  personal feelings first
                </Form.Label>
                <br></br>
                <ToggleButtonGroup
                  name="value20"
                  type="radio"
                  value={value20}
                  onChange={handleChange20}
                >
                  <ToggleButton value={1}>1</ToggleButton>
                  <ToggleButton value={2}>2</ToggleButton>
                  <ToggleButton value={3}>3</ToggleButton>
                  <ToggleButton value={4}>4</ToggleButton>
                  <ToggleButton value={5}>5</ToggleButton>
                </ToggleButtonGroup>
              </Form.Group>

              <br></br>
            </div>
            <div style={{marginLeft: "auto", marginRight: 0}}>
              <Button type="submit" style={{backgroundColor: "purple",
                  borderRadius: 20, width: "10vw", height: "10vh"}}>
                Complete
              </Button>
            </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
