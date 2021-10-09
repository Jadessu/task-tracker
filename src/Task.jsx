import React, { useEffect, useState } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "./graphql/mutations";
import { listTodos } from "./graphql/queries";
import * as FaIcons from "react-icons/fa";
import "./Task.css"
import requests from "./request";
import { fetchCompleted } from "./request";
import styled from "styled-components";
import Modal from "react-modal"



import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = {
  title: "",
  description: "",
  status: "NOTSTARTED",
  dueDate: "",
};

const Button = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #141414;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;

function Task( {title, fetchUrl}){


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
      const todoData = await fetchUrl;
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
        <button>Open modal</button>
        <Modal isOpen={true}>
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
        </Modal>
        <div className="todos">
          <div className="actions">

          <h1>{title}</h1>
          </div>
          <div className="todo-container">
            {todos.map((todo, index) => (
              <div className="todo">
                <div key={todo.id ? todo.id : index}>
                  <div className="title">
                    <p>{todo.title}</p>
                    <span>

                    <FaIcons.FaTrashAlt />
                    </span>

                    
                  </div>
                  <div className="description">
                    <p>{todo.description}</p>
                  </div>
                  <div className="date-status">
                    <input type="date" name="dueDate" value={todo.dueDate} />

                    <select
                      name="status"
                      id="status"
                      defaultValue={todo.status}
                    >
                      <option value="NOTSTARTED">Not Started</option>
                      <option value="INPROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="ONHOLD">On Hold</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}

export default Task