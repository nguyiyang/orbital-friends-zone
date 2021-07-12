import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";
import { Helmet } from "react-helmet";
import { Box, Container, Typography } from "@material-ui/core";

export default function NoChat() {
  const history = useHistory();

  async function Home() {
    try {
      history.push("./ChatGroups");
    } catch {}
  }

  return (
    /*
    <div>
      <div>
        <Button variant="link" onClick={Home}>
          Back
        </Button>
      </div>
      <div>
        You have not been assigned a group. 😞 Group Creation will be done from
        0000-0600 every Monday. Check again later!
      </div>
    </div>
    */
    <>
      <Helmet>
        <title>404 | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          align: "center"
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            backgroundColor: "background.default",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            align: "center"
          }}
        >
          <Typography align="center" color="textPrimary" variant="h2">
            Oops! You have not been assigned a group.
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            Group Creation will be done from 0000-0600 every Monday. Check again
            later!
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <img
              alt="Under development"
              src="/static/images/undraw_page_not_found_su7k.svg"
              style={{
                marginTop: 50,
                display: "inline-block",
                maxWidth: "100%",
                width: 560
              }}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}
