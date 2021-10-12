import React from "react"
import Amplify from "aws-amplify"
import { withAuthenticator } from "@aws-amplify/ui-react"

import './App.css';
import Sidebar from "./components/Sidebar"
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
// pages
import Overview from "./pages/Overview"
import {Tasks, InProgress, Completed, OnHold} from "./pages/Tasks"

import awsExports from "./aws-exports"
Amplify.configure(awsExports)




function App() {


  return (
  
    <Router>
      <Sidebar />
      <Switch>
        <Route path="/" exact component={Overview} />
        <Route path="/overview" exact component={Overview} />
        <Route path="/tasks" exact component={Tasks} />
        <Route path="/tasks/inprogress" exact component={InProgress} />
        <Route path="/tasks/completed" exact component={Completed} />
        <Route path="/tasks/onhold" exact component={OnHold} />
      </Switch>
    </Router>
  );
}

export default withAuthenticator(App);

