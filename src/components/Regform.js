import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { Link, useHistory } from "react-router-dom";

export default function Regform() {
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
  const history = useHistory();

  function generateScore() {
    const groupOne = value1 + value2 + value3 + value4 + value5 + value6 + value7+ value8 + value9 + value10;
    // save to database here
    alert(groupOne);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4"> Questionnaire </h2>
          <Form onSubmit={generateScore}>
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
              <Form.Label> You feel comfortable just walking up to someone you find interesting and striking up a conversation</Form.Label>
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
              <Form.Label> In a group, you are usually the one initiating meetups</Form.Label>
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
              <Form.Label> In your free time, you are more likely to hangout with your friends than to hangout alone</Form.Label>
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
              <Form.Label> Given a choice between partying and spending some alone time, you would prefer the former most of the time</Form.Label>
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
              <Form.Label> You cannot be left out in a group discussion</Form.Label>
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
              <Form.Label> You are happy to start the conversation in a group setting</Form.Label>
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
              <Form.Label> You often take the lead in decision making within a group</Form.Label>
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
            <Button className="w-100" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
