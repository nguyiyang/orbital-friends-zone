import React from "react";
import Admin from "./Admin";
import About from "./About";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Regform from "./Regform";
import Chat from "./Chat";
import PrivateRoute from "./PrivateRoute";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider> 
          <Router>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/regform" component={Regform} />
              <Route path="/admin" component={Admin} />
              <Route path= "/about" component={About} />
              <Route path="/chat" component={Chat} />
            </Switch>
          </Router>
    </AuthProvider>
  );
}

export default App;
