import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import blue from "@material-ui/core/colors/cyan";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: blue[100],
    color: theme.palette.common.black,
    marginBottom: theme.spacing(3),
    backgroundSize: "85% 85%",
    width: "80%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 3000000,
    left: 30
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(2),
      paddingRight: 0
    }
  }
}));

export default function AnnouncementCSS(props) {
  const classes = useStyles();
  const { post } = props;

  return (
    <Paper
      className={classes.mainFeaturedPost}
      style={{ backgroundImage: `url(${post.image})` }}
    >
      {/* Increase the priority of the hero background image */}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h3" color="inherit">
              {post.title}
            </Typography>
            <Typography variant="caption" display="block" color="secondary">
              {"by "}
              {post.userID}
            </Typography>
            <Typography variant="h5" color="inherit">
              {post.content}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

AnnouncementCSS.propTypes = {
  post: PropTypes.object
};
