import React from "react";
import Admin from "./Admin";
import About from "./pages/LoginRegister/About";
import Home from "./pages/dashboard/Home";
import Login from "./pages/LoginRegister/Login";
import Signup from "./pages/LoginRegister/Signup";
import Regform from "./pages/LoginRegister/Regform";
import Chat from "./pages/dashboard/Chat";
import NoChat from "./NoChat";
import Forum from "./pages/dashboard/Forum";
import Post from "./Post";
import Comment from "./Comment";
import Announcement from "./pages/dashboard/Announcement";
import MakeAnnouncement from "./MakeAnnouncement";
import MakeFeedback from "./pages/dashboard/CreateFeedback";
import Feedback from "./Feedback";
import Thankyou from "./Thankyou";
import ChatGroups from "./pages/dashboard/ChatGroups";
import Game from "./pages/dashboard/Game";
import ExitGroupCompleted from "./ExitGroupCompleted";
import PrivateRoute from "./PrivateRoute";
import RegformSuccess from "./pages/LoginRegister/RegisterSuccess";
import MainAppBar from "./MainAppBar";
import Test from "./Test";
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
          <Route path="/regform_success" component={RegformSuccess} />
          <Route path="/admin" component={Admin} />
          <Route path="/about" component={About} />
          <Route path="/chat" component={Chat} />
          <Route path="/NoChat" component={NoChat} />
          <Route path="/Forum" component={Forum} />
          <Route path="/addPost" component={Post} />
          <Route path="/addComment" component={Comment} />
          <Route path="/MakeAnnouncement" component={MakeAnnouncement} />
          <Route path="/Announcement" component={Announcement} />
          <Route path="/Feedback" component={Feedback} />
          <Route path="/CreateFeedback" component={MakeFeedback} />
          <Route path="/Thankyou" component={Thankyou} />
          <Route path="/ChatGroups" component={ChatGroups} />
          <Route path="/Game" component={Game} />
          <Route path="/ExitGroupCompleted" component={ExitGroupCompleted} />
          <Route path="/MainAppBar" component={MainAppBar} />
          <Route path="/Test" component={Test} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
