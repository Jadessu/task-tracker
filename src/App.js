import React, { useEffect, useState} from "react"
import Amplify, { API, graphqlOperation } from "aws-amplify"
import { createTodo} from "./graphql/mutations"
import { listTodos} from "./graphql/queries"
import './App.css';

import awsExports from "./aws-exports"
Amplify.configure(awsExports)

const initialState = { title: "", description: "", status: "NOTSTARTED", dueDate: "" }

function App() {

  const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState([])

  function setInput(key, value) {
    setFormState({...formState, [key]: value})
  }

  async function fetchTodos(){
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos))
      const todos = todoData.data.listTodos.items
      setTodos(todos)
    } catch ( err) { console.log(' error fetching todoos')}
  }
  return (
    <div className="App">
      <header className="App-header">
       
      </header>
    </div>
  );
}

export default App;
