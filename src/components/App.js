import React from "react";
import Admin from "./Admin/Admin";
import About from "./Login_Reg_Home/About";
import Home from "./Login_Reg_Home/Home";
import Login from "./Login_Reg_Home/Login";
import Signup from "./Login_Reg_Home/Signup";
import Regform from "./Login_Reg_Home/Regform";
import Chat from "./Chat/Chat";
import NoChat from "./Chat/NoChat";
import Forum from "./Forum/Forum";
import Post from "./Forum/Post";
import Comment from "./Forum/Comment";
import Announcement from "./Announcement/Announcement";
import MakeAnnouncement from "./Announcement/MakeAnnouncement";
import MakeFeedback from "./Feedback/CreateFeedback";
import Feedback from "./Feedback/Feedback";
import Thankyou from "./Feedback/Thankyou";
import ChatGroups from "./Chat/ChatGroups";
import Game from "./Chat/Game";
import ExitGroupCompleted from "./Chat/ExitGroupCompleted";
import PrivateRoute from "./PrivateRoute";
import RegformSuccess from "./Login_Reg_Home/RegisterSuccess";
import MainAppBar from "./Login_Reg_Home/AppBar/MainAppBar";
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
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
