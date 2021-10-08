import React, { useEffect, useState} from "react"
import Amplify, { API, graphqlOperation } from "aws-amplify"
import { createTodo} from "./graphql/mutations"
import { listTodos} from "./graphql/queries"
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       
      </header>
    </div>
  );
}

export default App;
