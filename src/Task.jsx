import React, { useEffect, useState } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { createTodo, deleteTodo, updateTodo } from "./graphql/mutations";
import * as FaIcons from "react-icons/fa";
import * as GrIcons from "react-icons/gr";
import "./Task.css";
import styled from "styled-components";
import Modal from "react-modal";
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

Modal.setAppElement("#root");
function Task({ title, fetchUrl }) {
  const [formState, setFormState] = useState(initialState);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [todos, setTodos] = useState([]);

  const [filterEvent, setFilterEvent] = useState();

  const [ sortedTasks, setSortedTasks] = useState([])

  let completedTasks = [];
  console.log(completedTasks);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const todoData = await fetchUrl;
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
    } catch (err) {
      console.log(" error fetching todoos");
    }
  }

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }



  useEffect(() => {

  filterFunction()

  }, [filterEvent, sortedTasks]);

  // New function to filter tasks
  function filterTodos(event) {
    setFilterEvent(event);
  }
  function filterFunction() {
    if (filterEvent === "Due First") {
      let DueFirst = [...todos].sort(
        (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
      );
      if ( todos !== DueFirst){
      setTodos(DueFirst);}
    } else if (filterEvent === "Alphabetically") {
      let byLetters = [...todos].sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase())
      );
       if ( todos !== byLetters){

         setTodos(byLetters);
     }
      
    } else if (filterEvent === "Due Last") {
      let DueLast = [...todos].sort(
        (a, b) => new Date(b.dueDate) - new Date(a.dueDate)
      );
        if ( todos !== DueLast){
      setTodos(DueLast)}
    }
  }

  async function addTodo() {
    try {
      if (!formState.title || !formState.description) return;
      const todo = { ...formState };
      setTodos([...todos, todo]);
      setSortedTasks([...todos, todo]);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createTodo, { input: todo }));
      setModalIsOpen(false);
    } catch (err) {
      console.log(" error creating todo:", err);
    }
  }

  async function removeTodo(id) {
    try {
      await API.graphql(graphqlOperation(deleteTodo, { input: { id } }));
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log("failed to delete todo:", error);
    }
  }

  // variables to update todo
  let targetTodoForDateChange;
  let targetTodoForStatusChange;

  async function updateDueDate(todoId, todoDueDate) {
    try {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === todoId) {
          targetTodoForDateChange = todo;
          targetTodoForDateChange.dueDate = todoDueDate;
          return targetTodoForDateChange;
        }
        return todo;
      });
      await API.graphql(
        graphqlOperation(updateTodo, {
          input: {
            dueDate: targetTodoForDateChange.dueDate,
            id: targetTodoForDateChange.id,
          },
        })
      );
      setTodos(updatedTodos);
      filterFunction();
    } catch (err) {
      console.log("error updating todo:", err);
    }
  }

  async function updateStatus(todoId, todoStatus) {
    try {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === todoId) {
          targetTodoForStatusChange = todo;
          targetTodoForStatusChange.status = todoStatus;
          return targetTodoForStatusChange;
        }
        return todo;
      });
      await API.graphql(
        graphqlOperation(updateTodo, {
          input: {
            status: targetTodoForStatusChange.status,
            id: targetTodoForStatusChange.id,
          },
        })
      );
      setTodos(updatedTodos);
    } catch (err) {
      console.log("error updating todo:", err);
    }
  }


  return (
    <IconContext.Provider value={{ color: "#161b33" }}>
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
          <div className="close" onClick={() => setModalIsOpen(false)}>
            <GrIcons.GrClose />
          </div>
          <div className="form-title">
            <h2>Add A New Task</h2>
          </div>
          <div className="form-wrapper">
            <form>
              <label htmlFor="">Title:</label>
              <input
                required
                type="text"
                name="title"
                onChange={(event) => setInput("title", event.target.value)}
                value={formState.title}
              />
             
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
              </div>
              <button onClick={() => addTodo()}>Add Task</button>
            </form>
          </div>
        </Modal>
        <div class="select wrapper">
          <select
            name="sort"
            id="sort"
            onChange={(event) => filterTodos(event.target.value)}
          >
            <option value="" disabled selected>
              {" "}
              Sort Tasks
            </option>
            <option value="Due First">Due First</option>
            <option value="Due Last">Due Last</option>
            <option value="Alphabetically">Alphabetically</option>
          </select>
        </div>
        <div className="todos">
          <div className="todo-container">
            {todos.map((todo, index) => (
              <div className="todo">
                <div key={todo.id ? todo.id : index}>
                  <div className="todo-title">
                    <p>{todo.title}</p>
                    <span
                      className="delete-button"
                      onClick={() => removeTodo(todo.id)}
                    >
                      <FaIcons.FaTrashAlt />
                    </span>
                  </div>
                  <div className="description">
                    <p>{todo.description}</p>
                  </div>
                  <div className="date-status">
                    <input
                      type="date"
                      name="dueDate"
                      value={todo.dueDate}
                      onChange={(event) =>
                        updateDueDate(todo.id, event.target.value)
                      }
                    />

                    <select
                      name="status"
                      id="status"
                      defaultValue={todo.status}
                      onChange={(event) =>
                        updateStatus(todo.id, event.target.value)
                      }
                    >
                      <option value="NOTSTARTED">Not Started</option>
                      <option value="INPROGRESS">In Progress</option>
                      <option value="COMPLETED" >Completed</option>
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

export default Task;
