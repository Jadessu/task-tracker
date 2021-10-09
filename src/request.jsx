import React, { useEffect, useState } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "./graphql/mutations";
import { listTodos } from "./graphql/queries";
import * as FaIcons from "react-icons/fa";
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

