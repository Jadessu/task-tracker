import React, { useEffect, useState } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "./graphql/mutations";
import { listTodos } from "./graphql/queries";
import * as FaIcons from "react-icons/fa";


import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = {
  title: "",
  description: "",
  status: "NOTSTARTED",
  dueDate: "",
};


function Task( {title}){


  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
    } catch (err) {
      console.log(" error fetching todoos");
    }
  }

  async function addTodo() {
    try {
      if (!formState.title || !formState.description) return;
      const todo = { ...formState };
      setTodos([...todos, todo]);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createTodo, { input: todo }));
    } catch (err) {
      console.log(" error creating todo:", err);
    }
  }
    return (
      <div>
        <form>
          <input
            required
            name="title"
            onChange={(event) => setInput("title", event.target.value)}
            value={formState.title}
            placeholder="Title"
          />
          <input
            name="description"
            onChange={(event) => setInput("description", event.target.value)}
            value={formState.description}
            placeholder="Description"
          />
          <input
            required
            type="date"
            name="dueDate"
            onChange={(event) => setInput("dueDate", event.target.value)}
            value={formState.dueDate}
          />
          <select
            required
            defaultValue="NOTSTARTED"
            name="status"
            onChange={(event) => setInput("status", event.target.value)}
          >
            <option value="NOTSTARTED">Not Started</option>
            <option value="INPROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="ONHOLD">On Hold</option>
          </select>
          <button onClick={() => addTodo()}>Add Task</button>
        </form>
        <div className="todos">
          <h2>{title}</h2>

          {todos.map((todo, index) => (
            <div key={todo.id ? todo.id : index}>
              <div className="title">
                <p>{todo.title}</p>
              <FaIcons.FaTrashAlt/>
              </div>
              <div className="description">
              <p>{todo.description}</p>
              </div>
              <div className="date-status">
              <input type="date" name="dueDate" value={todo.dueDate} />

              <select name="status" id="status" defaultValue={todo.status}>
                <option value="NOTSTARTED">Not Started</option>
                <option value="INPROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="ONHOLD">On Hold</option>
              </select>
              </div>

             
            </div>
          ))}
        </div>
      </div>
    );
}

export default Task