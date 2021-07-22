import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Container, ButtonBase, Typography } from "@material-ui/core";
import AppBar from "./AppBar/MainAppBar";
import FeedbackButton from "./FeedbackButton";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(5),
  },
  images: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexWrap: "wrap"
  },
  imageWrapper: {
    position: "relative",
    display: "block",
    padding: 0,
    borderRadius: 0,
    height: "55vh",
    [theme.breakpoints.down("sm")]: {
      width: "100% !important",
      height: 100
    },
    "&:hover": {
      zIndex: 1
    },
    "&:hover $imageBackdrop": {
      opacity: 0.15
    },
    "&:hover $imageMarked": {
      opacity: 0
    },
    "&:hover $imageTitle": {
      border: "4px solid currentColor"
    }
  },
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create("opacity")
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity")
  }
});

function Home(props) {
  const { classes } = props;
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const images = [
    {
      url:
        "https://images.unsplash.com/photo-1622495893617-38b112b30790?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1099&q=80"
        ,
      title: "Chat",
      width: "33%"
    },
    {
      url:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1934&q=80",
      title: "Forum",
      width: "33%"
    },
    {
      url:
      "https://images.unsplash.com/photo-1610450363377-356b69e6558b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1041&q=80",
      title: "Announcements",
      width: "33%"
    }
  ];

  function NextEvent(x) {
    if (x === 0) {
      history.push("./ChatGroups");
    } else if (x === 1) {
      history.push("./Forum");
    } else if (x === 2) {
      history.push("./Announcement");
    }
  }

  return (
    <div style={{backgroundColor: "#cfe8fc"}}>
    <Container className={classes.root} component="section">
      <AppBar />
      <div className={classes.images}>
        {images.map((image, index) => (
          <ButtonBase
            key={image.title}
            className={classes.imageWrapper}
            onClick={() => NextEvent(index)}
            style={{
              width: image.width
            }}
          >
            <div
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`
              }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton}>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <div className={classes.imageMarked} />
              </Typography>
            </div>
          </ButtonBase>
        ))}
        <FeedbackButton />
      </div>
    </Container>
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
