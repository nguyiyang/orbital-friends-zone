import React from "react";
import Home from "./Home"
import Login from "./Login"
import Signup from "./Signup";
import Regform from "./Regform"
import PrivateRoute from "./PrivateRoute"
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

function App() {
  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div classNAme="w-100" style={{ maxWidth: "400px" }}>
          <Router>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/regform" component={Regform} />
            </Switch>
          </Router>
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
