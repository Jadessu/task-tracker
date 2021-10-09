import React, { useEffect, useState} from "react"
import Amplify, { API, graphqlOperation, Auth } from "aws-amplify"
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react"
import { createTodo} from "./graphql/mutations"
import { listTodos} from "./graphql/queries"
import './App.css';
import Sidebar from "./components/Sidebar"
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
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

<Sidebar/>
    </Router>

    
  );
}

export default withAuthenticator(App);

