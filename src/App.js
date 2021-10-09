import React, { useEffect, useState} from "react"
import Amplify, { API, graphqlOperation, Auth } from "aws-amplify"
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react"
import { createTodo} from "./graphql/mutations"
import { listTodos} from "./graphql/queries"
import './App.css';
import Sidebar from "./components/Sidebar"
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
// pages
import Overview from "./pages/Overview"
import {Tasks, InProgress, Completed, OnHold} from "./pages/Tasks"

import awsExports from "./aws-exports"
Amplify.configure(awsExports)


const initialState = { title: "", description: "", status: "NOTSTARTED", dueDate: "" }


function App() {


  return (
    // <div className="App">
    //   <header className="App-header">
    //    <h2> TASK TRACKER</h2>
    //    <AmplifySignOut/>
    //   </header>
    //   <div>

    //   </div>
    // </div>
    <Router>
      <Sidebar />
      <Switch>
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

