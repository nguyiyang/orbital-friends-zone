import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router-dom";
import AppBar from "./AppBar";
import Toolbar, { styles as toolbarStyles } from "./AppBar_1";
import { useAuth } from "../../contexts/AuthContext";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const styles = (theme) => ({
  title: {
    fontSize: 24
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: "space-between"
  },
  left: {
    flex: 1
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
      await logout();
      history.push("/login");
    } catch {}
  }

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            href="./admin"
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
              {"Sign Out"}
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