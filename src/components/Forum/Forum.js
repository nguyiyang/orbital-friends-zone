import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Typography } from "@material-ui/core";
import MainFeaturedPost from "./MainFeaturedPost";
import AppBar from "../Login_Reg_Home/AppBar/MainAppBar";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";

const useStyles = makeStyles((theme) => ({
  backButton: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.common.white,
  },
  postButton: {
    margin: theme.spacing(3)
  }
}));

export default function Forum() {
  const history = useHistory();
  const classes = useStyles();

  async function Home() {
    try {
      history.push("./");
    } catch {}
  }

  async function addPost() {
    try {
      history.push("./addPost");
    } catch {}
  }

  return (
    <div style={{ backgroundColor: "#cfe8fc" }}>
      <AppBar />
      <Typography
      component="div"
      variant="body1"
      style={{ width: '100%', position: 'relative' }}
    >
      <Box
        bgcolor="grey.700"
        color="white"
        p={2}
        position="static"
        top={0}
        left="48%"
        zIndex="tooltip"
      >
        Forum
      </Box>
      </Typography>
      <div>
        <header>
          <Button
            variant="outlined"
            color="inherit"
            className={classes.backButton}
            onClick={Home}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={addPost}
            right="0"
            className={classes.postButton}
          >
            Create Post
          </Button>
        </header>

        <section>
          <ShowForum />
        </section>
      </div>
    </div>
  );
}

const auth = firebase.auth();
const firestore = firebase.firestore();

function ShowForum() {
  const postRef = firestore.collection("Forum");
  const query = postRef.orderBy("createdAt", "desc");
  const [posts] = useCollectionData(query, { idField: "id" });

  return (
    <>
      <main>
        {posts &&
          posts.map((text) => (
            <div>
              <MainFeaturedPost post={text} />
            </div>
          ))}
      </main>
    </>
  );
}
