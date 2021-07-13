import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router-dom";
import AppBar from "./AppBar";
import Toolbar, { styles as toolbarStyles } from "./AppBar_1";
import { useAuth } from "../../../contexts/AuthContext";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Box, Container, Typography, Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const styles = (theme) => ({
  title: {
    fontSize: 39
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: "space-between"
  },
  left: {
    flex: 1,
    float: "left"
  },
  center: {
    flex: 1,
    float: "left"
  },
  leftLinkActive: {
    color: theme.palette.common.white
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end"
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3)
  },
  linkSecondary: {
    color: theme.palette.secondary.main
  }
});

function AppAppBar(props) {
  const { classes } = props;

  const history = useHistory();

  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    try {
      console.log("hi");
      await logout();
      history.push("/login");
    } catch {}
  }

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.center} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            href="./"
          >
            {"FriendsZone"}
          </Link>
          <div className={classes.right}>
            <Link
              component="button"
              variant="h6"
              underline="none"
              className={clsx(classes.rightLink, classes.linkSecondary)}
              onClick={() => {
                handleLogout();
              }}
            >
              {<ExitToAppIcon fontSize="large" />}
              {"  Sign Out"}
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppAppBar);
