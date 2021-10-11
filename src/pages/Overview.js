import React, {useState, useEffect} from 'react'
import Card from '../components/dashboard/Card'
import "./Overview.css"
import Task from '../Task';
import * as FaIcons from "react-icons/fa";
import * as GrIcons from "react-icons/gr";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import * as IMIcons from "react-icons/im";
import * as VsIcons from "react-icons/vsc"
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { listTodos } from '../graphql/queries';

function Overview(props) {
  const [allTodos, setAllTodos] = useState([]);



    useEffect(() => {
     
      fetchAllTodos();
    }, []);

  async function fetchAllTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      const todos = todoData.data.listTodos.items;
      setAllTodos(todos);
    } catch (err) {
      console.log(" error fetching todoos");
    }
  }

console.log(allTodos)

let inProgressArr = allTodos.filter( todo => todo.status === "INPROGRESS")
let onHoldArr = allTodos.filter( todo => todo.status === "ONHOLD")
let completedArr = allTodos.filter( todo => todo.status === "COMPLETED")
let notStartedArr = allTodos.filter( todo => todo.status === "NOTSTARTED")



console.log(notStartedArr)

    return (
      <div className="wrapper">
        <div className="row">
          <section class="data-card">
            <Card
              title="Not Started"
              icon={<VsIcons.VscDebugRestartFrame />}
              amount={notStartedArr.length}
            />
          </section>
          <section class="data-card">
            <Card
              title="Tasks In Progress"
              icon={<FaIcons.FaHourglassStart />}
              amount={inProgressArr.length}
            />
          </section>
          <section class="data-card">
            <Card
              title="Tasks Completed"
              icon={<BsIcons.BsCalendarCheck />}
              amount={completedArr.length}
            />
          </section>
          <section class="data-card">
            <Card
              title="Tasks On Hold"
              icon={<IMIcons.ImPause2 />}
              amount={onHoldArr.length}
            />
          </section>
        </div>
      </div>
    );
}

export default Overview
