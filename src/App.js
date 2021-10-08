import React, { useEffect, useState} from "react"
import Amplify, { API, graphqlOperation } from "aws-amplify"
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react"
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

  async function addTodo(){
    try {
      if (!formState.title || !formState.description) return
      const todo = {...formState}
      setTodos([...todos, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createTodo, { input: todo}))
    } catch (err) {
      console.log(" error creating todo:", err)
    }
  }
  return (
    <div className="App">
      <header className="App-header">
       <AmplifySignOut/>
      </header>
      <div>
        <form>
        <input 
        required
        name="title"
        onChange={event => setInput('title', event.target.value)} 
        value={formState.title}
        placeholder="Title"
        />
        <input
        name="description"
        onChange={ event => setInput('description', event.target.value)}
        value={formState.description}
        placeholder="Description" />
        <input
        required
        type="date"
        name="dueDate"
        onChange={ event => setInput("dueDate", event.target.value)}
        value={formState.dueDate}
         />
         <select 
         required
         defaultValue="NOTSTARTED"
         name="status"
         onChange={ event => setInput('status', event.target.value)}
         >
            <option value="NOTSTARTED">Not Started</option>
            <option value="INPROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="ONHOLD">On Hold</option>
           </select>
           <button onClick={() => addTodo()}>Add Task</button>
      </form>
      </div>
    </div>
  );
}

export default App;
