import React, { useRef, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: "20vh",
    width: "50vw",
    padding: theme.spacing(3),
    textAlign: "center",
  },
  description: {
    width: "50vw",
    padding: theme.spacing(3),
  },
  radio: {
    justify: "center",
  },
  control: {
    padding: theme.spacing(2),
  },
  button: {
    height: "20vh",
    width: "10vw",
    marginLeft: "25vw",
  },
}));

export default function Regform() {
  const [error, setError] = useState("");
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
  const handleChange1 = (event) => {
    setValue1(event.target.value);
  };
  const handleChange2 = (event) => {
    setValue2(event.target.value);
  };
  const handleChange3 = (event) => {
    setValue3(event.target.value);
  };
  const handleChange4 = (event) => {
    setValue4(event.target.value);
  };
  const handleChange5 = (event) => {
    setValue5(event.target.value);
  };
  const handleChange6 = (event) => {
    setValue6(event.target.value);
  };
  const handleChange7 = (event) => {
    setValue7(event.target.value);
  };
  const handleChange8 = (event) => {
    setValue8(event.target.value);
  };
  const handleChange9 = (event) => {
    setValue9(event.target.value);
  };
  const handleChange10 = (event) => {
    setValue10(event.target.value);
  };
  const handleChange11 = (event) => {
    setValue11(event.target.value);
  };
  const handleChange12 = (event) => {
    setValue12(event.target.value);
  };
  const handleChange13 = (event) => {
    setValue13(event.target.value);
  };
  const handleChange14 = (event) => {
    setValue14(event.target.value);
  };
  const handleChange15 = (event) => {
    setValue15(event.target.value);
  };
  const handleChange16 = (event) => {
    setValue16(event.target.value);
  };
  const handleChange17 = (event) => {
    setValue17(event.target.value);
  };
  const handleChange18 = (event) => {
    setValue18(event.target.value);
  };
  const handleChange19 = (event) => {
    setValue19(event.target.value);
  };
  const handleChange20 = (event) => {
    setValue20(event.target.value);
  };

  const classes = useStyles();

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

  function generateScore(e) {
    e.preventDefault();
    setError("");
    const introvertExtrovert =
      parseInt(value1) +
      parseInt(value2) +
      parseInt(value3) +
      parseInt(value4) +
      parseInt(value5)
    const sensingIntuitive =
      parseInt(value6) +
      parseInt(value7) +
      parseInt(value8) +
      parseInt(value9) +
      parseInt(value10);
    const thinkingFeeling =
      parseInt(value11) +
      parseInt(value12) +
      parseInt(value13) +
      parseInt(value14) +
      parseInt(value15)
    const judgingPerceiving =
      parseInt(value16) +
      parseInt(value17) +
      parseInt(value18) +
      parseInt(value19) +
      parseInt(value20);
    console.log(usernameRef.current.value);
    // save to database here
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    if (
      value1 &&
      value2 &&
      value3 &&
      value4 &&
      value5 &&
      value6 &&
      value7 &&
      value8 &&
      value9 &&
      value10 &&
      value11 &&
      value12 &&
      value13 &&
      value14 &&
      value15 &&
      value16 &&
      value17 &&
      value18 &&
      value19 &&
      value20
    ) {
      db.collection("/users")
        .where("username", "==", usernameRef.current.value)
        .get()
        .then((doc) => {
          if (doc.size > 0) {
            setError("Username exists");
          } else {
            db.collection("/users").doc(uid).set(
              {
                id: users,
                username: usernameRef.current.value,
                admin: false,
                introvertExtrovert: introvertExtrovert,
                sensingIntuitive: sensingIntuitive,
                thinkingFeeling: thinkingFeeling,
                judgingPerceiving: judgingPerceiving,
                groupId: 0,
              },
              { merge: true }
            )
            history.push("/regform_success");
          }
        });
    } else {
      alert("Please complete all questions!");
    }
  }

  return (
    <>
      <div style={{ backgroundColor: "#cfe8fc" }}>
        <Form onSubmit={generateScore}>
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
              <Grid
                container
                justify="center"
                spacing={2}
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <br></br>
                <Grid item>
                  <Paper className={classes.description}>
                    <h3>Welcome </h3>
                    <p style={{ width: "40vw" }}>
                      {" "}
                      We would like to get to know you better! Please answer the
                      following questions as truthfully as possible. 1 will
                      indicate that you cannot relate to the statement at all
                      while 5 means that the sentence describes you perfectly.{" "}
                    </p>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper className={classes.description}>
                  {error && <Alert variant="danger">{error}</Alert>}
                    <p>Username *</p>
                    
                    <TextField
                      id="standard-basic"
                      placeholder="Enter your username"
                      inputRef={usernameRef}
                    />
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper className={classes.description}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        {" "}
                        You regularly make new friends.
                      </FormLabel>
                      <br></br>

                      <RadioGroup
                        row
                        aria-label="q1"
                        name="q1"
                        value={value1}
                        onChange={handleChange1}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="1"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="2"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="3"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="4"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="5"
                          style={{ marginLeft: "4vw" }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper className={classes.description}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        {" "}
                        At social event, you will try to introduce yourself to
                        new people.
                      </FormLabel>
                      <br></br>

                      <RadioGroup
                        row
                        aria-label="q2"
                        name="q2"
                        value={value2}
                        onChange={handleChange2}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="1"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="2"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="3"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="4"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="5"
                          style={{ marginLeft: "4vw" }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper className={classes.description}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        {" "}
                        You feel comfortable just walking up to someone you find
                        interesting and striking up a conversation.
                      </FormLabel>
                      <br></br>

                      <RadioGroup
                        row
                        aria-label="q3"
                        name="q3"
                        value={value3}
                        onChange={handleChange3}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="1"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="2"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="3"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="4"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="5"
                          style={{ marginLeft: "4vw" }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper className={classes.description}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        {" "}
                        In a group, you are usually the one initiating meetups.
                      </FormLabel>
                      <br></br>

                      <RadioGroup
                        row
                        aria-label="q4"
                        name="q4"
                        value={value4}
                        onChange={handleChange4}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="1"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="2"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="3"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="4"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="5"
                          style={{ marginLeft: "4vw" }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper className={classes.description}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        {" "}
                        In your free time, you are more likely to hangout with
                        your friends than to hangout alone.
                      </FormLabel>
                      <br></br>

                      <RadioGroup
                        row
                        aria-label="q5"
                        name="q5"
                        value={value5}
                        onChange={handleChange5}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="1"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="2"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="3"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="4"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="5"
                          style={{ marginLeft: "4vw" }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper className={classes.description}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        {" "}
                        You take enjoyment in building far plans.
                      </FormLabel>
                      <br></br>

                      <RadioGroup
                        row
                        aria-label="q6"
                        name="q6"
                        value={value6}
                        onChange={handleChange6}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="1"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="2"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="3"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="4"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="5"
                          style={{ marginLeft: "4vw" }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper className={classes.description}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        {" "}
                        Imagine you’re hiking. You see a path nobody came across before. Can you take a risk to take it?
                      </FormLabel>
                      <br></br>

                      <RadioGroup
                        row
                        aria-label="q7"
                        name="q7"
                        value={value7}
                        onChange={handleChange7}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="1"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="2"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="3"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="4"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="5"
                          style={{ marginLeft: "4vw" }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper className={classes.description}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        {" "}
                        You often tend to remember events from your past.
                      </FormLabel>
                      <br></br>

                      <RadioGroup
                        row
                        aria-label="q8"
                        name="q8"
                        value={value8}
                        onChange={handleChange8}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="1"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="2"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="3"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="4"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="5"
                          style={{ marginLeft: "4vw" }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper className={classes.description}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        {" "}
                        You prefer to go with the flow of things.
                      </FormLabel>
                      <br></br>

                      <RadioGroup
                        row
                        aria-label="q9"
                        name="q9"
                        value={value9}
                        onChange={handleChange9}
                      >
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="1"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="2"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="3"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="4"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="5"
                          style={{ marginLeft: "4vw" }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper className={classes.description}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        {" "}
                        You tend to pay more attention to the big picture than stick to the details.
                      </FormLabel>
                      <br></br>

                      <RadioGroup
                        row
                        aria-label="q10"
                        name="q10"
                        value={value10}
                        onChange={handleChange10}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="1"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="2"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="3"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="4"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="5"
                          style={{ marginLeft: "4vw" }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper className={classes.description}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        {" "}
                        You describe yourself as a rational human being.
                      </FormLabel>
                      <br></br>

                      <RadioGroup
                        row
                        aria-label="q11"
                        name="q11"
                        value={value11}
                        onChange={handleChange11}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="1"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="2"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="3"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="4"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="5"
                          style={{ marginLeft: "4vw" }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper className={classes.description}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        {" "}
                        Most of the time, emotions are more important than facts
                        in your opinion.
                      </FormLabel>
                      <br></br>

                      <RadioGroup
                        row
                        aria-label="q12"
                        name="q12"
                        value={value12}
                        onChange={handleChange12}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="1"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="2"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="3"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="4"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="5"
                          style={{ marginLeft: "4vw" }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper className={classes.description}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        {" "}
                        When knowing that you have the optimal solution, you
                        will still consult everyone involved to ensure that
                        everyone is agreeable.
                      </FormLabel>
                      <br></br>

                      <RadioGroup
                        row
                        aria-label="q13"
                        name="q13"
                        value={value13}
                        onChange={handleChange13}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="1"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="2"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="3"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="4"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="5"
                          style={{ marginLeft: "4vw" }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>

                <Grid item>
                  <Paper className={classes.description}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        {" "}
                        You will help anyone in need at your own expense.
                      </FormLabel>
                      <br></br>

                      <RadioGroup
                        row
                        aria-label="q14"
                        name="q14"
                        value={value14}
                        onChange={handleChange14}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="1"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="2"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="3"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="4"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="5"
                          style={{ marginLeft: "4vw" }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper className={classes.description}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        {" "}
                        In an argument with your friend, you think that the fact
                        is less important than the feelings of your friend.
                      </FormLabel>
                      <br></br>

                      <RadioGroup
                        row
                        aria-label="q15"
                        name="q15"
                        value={value15}
                        onChange={handleChange15}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="1"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="2"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="3"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="4"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="5"
                          style={{ marginLeft: "4vw" }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper className={classes.description}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        {" "}
                        You plan ahead and have no problem following through when doing a project.
                      </FormLabel>
                      <br></br>

                      <RadioGroup
                        row
                        aria-label="q16"
                        name="q16"
                        value={value16}
                        onChange={handleChange16}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="1"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="2"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="3"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="4"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="5"
                          style={{ marginLeft: "4vw" }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper className={classes.description}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        {" "}
                        You tend to mix both work and play.
                      </FormLabel>
                      <br></br>

                      <RadioGroup
                        row
                        aria-label="q17"
                        name="q17"
                        value={value17}
                        onChange={handleChange17}
                      >
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="1"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="2"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="3"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="4"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="5"
                          style={{ marginLeft: "4vw" }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper className={classes.description}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        {" "}
                        You work on a single task, complete it efficiently, before moving to the next task.
                      </FormLabel>
                      <br></br>

                      <RadioGroup
                        row
                        aria-label="q18"
                        name="q18"
                        value={value18}
                        onChange={handleChange18}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="1"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="2"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="3"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="4"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="5"
                          style={{ marginLeft: "4vw" }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper className={classes.description}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        {" "}
                        Your desk is usually neat and tidy.
                      </FormLabel>
                      <br></br>

                      <RadioGroup
                        row
                        aria-label="q19"
                        name="q19"
                        value={value19}
                        onChange={handleChange19}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="1"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="2"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="3"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="4"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="5"
                          style={{ marginLeft: "4vw" }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>

                <Grid item>
                  <Paper className={classes.description}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        {" "}
                        You like to take time to weigh all your options before deciding on something.
                      </FormLabel>
                      <br></br>

                      <RadioGroup
                        row
                        aria-label="q20"
                        name="q20"
                        value={value20}
                        onChange={handleChange20}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="1"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="2"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="3"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="4"
                          style={{ marginLeft: "4vw" }}
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="5"
                          style={{ marginLeft: "4vw" }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>
              </Grid>
              <br></br>
              <Grid container className={classes.button}>
                <Grid item>
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "#406dc2",
                      borderRadius: 5,
                      
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      </div>
    </>
  );
}
