import React, { useEffect, useState } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "./graphql/mutations";
import { listTodos } from "./graphql/queries";
import * as FaIcons from "react-icons/fa";
import * as GrIcons from "react-icons/gr"
import "./Task.css"
import requests from "./request";
import { fetchCompleted } from "./request";
import styled from "styled-components";
import Modal from "react-modal"
import { IconContext } from "react-icons/lib";




import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = {
  title: "",
  description: "",
  status: "NOTSTARTED",
  dueDate: "",
};

const Button = styled.button`
  background: #161b33;
  border: none;
  color: #fff;
  padding: 15px 45px;
  font-size: 17px;
  outline: none;
  border-radius: 3px;
  font-family: Roboto;
  letter-spacing: 1.5px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.1s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  margin: 10px;

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

Modal.setAppElement("#root")
function Task( {title, fetchUrl}){


  const [formState, setFormState] = useState(initialState);
  const [ modalIsOpen, setModalIsOpen] = useState(false)
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
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="wrapper">
          <div className="actions">
            <div className="page-title">
              <h1>{title}</h1>
            </div>
            <span>
              <Button onClick={() => setModalIsOpen(true)}>+ New Task</Button>
            </span>
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0,0,0.8)",
              },
              content: {
                width: "800px",
                height: "500px",
                boxShadow: "0 5px 16px rgba(0, 0, 0, 0,2)",
                background: "#fff",
                color: "#000",
                borderRadius: "10px",
                position: "absolute",
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
              },
            }}
          >
            <h2>Add A New Task</h2>
            <div className="form-wrapper">
              <form>
                <div className="close" onClick={() => setModalIsOpen(false)}>
                  <GrIcons.GrClose />
                </div>
                <label htmlFor="">Title:</label>
                <input
                  required
                  type="text"
                  name="title"
                  onChange={(event) => setInput("title", event.target.value)}
                  value={formState.title}
                />
                {/* <input
                  name="description"
                  onChange={(event) =>
                    setInput("description", event.target.value)
                  }
                  value={formState.description}
                  placeholder="Description"
                /> */}
                <label htmlFor="">Description:</label>
                <textarea
                  type="text"
                  name="description"
                  onChange={(event) =>
                    setInput("description", event.target.value)
                  }
                  value={formState.description}
                ></textarea>
                <div className="date-status">
                  <input
                    required
                    type="date"
                    name="dueDate"
                    onChange={(event) =>
                      setInput("dueDate", event.target.value)
                    }
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
                </div>
                <button onClick={() => addTodo()}>Add Task</button>
              </form>
            </div>
          </Modal>
          <div className="todos">
            <div className="todo-container">
              {todos.map((todo, index) => (
                <div className="todo">
                  <div key={todo.id ? todo.id : index}>
                    <div className="todo-title">
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
      </IconContext.Provider>
    );
}

export default Task