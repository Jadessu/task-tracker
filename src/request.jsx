import Amplify, { API, graphqlOperation } from "aws-amplify";
import { listTodos, todosAlphabetically, todosDueFirst} from "./graphql/queries";
import "./Task.css";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

 const completedfilter = {
   status: {
     eq: "COMPLETED",
   },
 };

 const inProgressFilter = {
   status: {
     eq: "INPROGRESS",
   },
 };

 const notStartedFilter = {
   status: {
     eq: "NOTSTARTED",
   },
 };

 const onHoldFilter = {
   status: {
     eq: "ONHOLD",
   },
 };



 export const fetchAll = API.graphql(graphqlOperation(listTodos));

export const fetchCompleted =  API.graphql({
  query: listTodos,
  variables: { filter: completedfilter },
});

export const fetchInProgress =  API.graphql({
  query: listTodos,
  variables: { filter: inProgressFilter },
});

export const fetchNotStarted =  API.graphql({
  query: listTodos,
  variables: { filter: notStartedFilter },
});

export const fetchonHold =  API.graphql({
  query: listTodos,
  variables: { filter: onHoldFilter },
});

export const fetchByTitle = async () => {
  try {
  const todoData = await API.graphql(graphqlOperation(todosAlphabetically, { type: "Todo"}));
  const todos = await todoData.data.todosAlphabetically.items
  const alphabeticalTodo = todos.sort(( a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
  return alphabeticalTodo
  } catch (error){
    console.log("error getting todos alphabetically:", error)
  }
}

export const fetchDueFirst = async () => {
try {
  const todoData = await API.graphql(graphqlOperation(todosDueFirst, {type: "Todo"}))
  const todos = await todoData.data.todosDueFirst.items
  const dueFirstTodos = todos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
  return dueFirstTodos
} catch (error){
  console.log("error getting todos by date:", error)
}
}