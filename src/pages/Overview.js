import React, {useState, useEffect} from 'react'
import Card from '../components/dashboard/Card'
import "./Overview.css"
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import * as IMIcons from "react-icons/im";
import * as VsIcons from "react-icons/vsc"
import  { API, graphqlOperation } from "aws-amplify";
import { listTodos } from '../graphql/queries';
import Week from '../components/dashboard/Week';
import Lottie from "react-lottie"
import animationData from "../lotties/greeting-intro.json"
import NewsList from '../components/News/NewsList';
import { Auth } from "aws-amplify";


function Overview(props) {
  const [allTodos, setAllTodos] = useState([]);
        const [user, setUser] = useState("");


  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderSettings: {
      preserveAspectRation: "xMidYMid slice"
    }
  }



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

   Auth.currentAuthenticatedUser().then((user) => {
     setUser(user.username);
   });


function getTomorrow(){
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toDateString()
}


// GET CURRENT WEEK
let week = []
  let curr = new Date()

  for (let i = 1; i<= 7; i++){
    let first = curr.getDate() - curr.getDay() + i
    let day = new Date(curr.setDate(first)).toDateString()
    week.push(day)  
  }
let restOfWeek = week.splice(2)

function checkThisWeek(day){
  return day === restOfWeek[1] || day === restOfWeek[2] || day === restOfWeek[3] || day===restOfWeek[4] || day===restOfWeek[5]
}



  const dueToday = allTodos.filter( todo => new Date(todo.dueDate).toDateString() === new Date().toDateString())
  const dueTomorrow = allTodos.filter( todo => new Date(todo.dueDate).toDateString() === getTomorrow())
  const dueThisWeek = allTodos.filter( todo => checkThisWeek(new Date(todo.dueDate).toDateString()) )

let todayArr = []
let tomorrowArr = []
let weekArr = []
 dueTomorrow.map((todo) => tomorrowArr.push(todo.title))
 dueToday.map((todo) => todayArr.push(todo.title))
 dueThisWeek.map((todo) => weekArr.push(todo.title))



 
 

let inProgressArr = allTodos.filter( todo => todo.status === "INPROGRESS")
let onHoldArr = allTodos.filter( todo => todo.status === "ONHOLD")
let completedArr = allTodos.filter( todo => todo.status === "COMPLETED")
let notStartedArr = allTodos.filter( todo => todo.status === "NOTSTARTED")




    return (
      <div className="wrapper">
        <div class="main__title">
        <div className="lottie-file">
          <Lottie className = "lottie"options={defaultOptions} height={200} width={200}/>
        </div>
          
          <div class="main__greeting">
            <h1>Hello, {user}</h1>
            <p>Welcome to your Task dashboard</p>
          </div>
        </div>

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
        <div className="row">
        
          <section className="data-week">
            <div classsName="data-week-title">
              <h1>This Week's Overview</h1>
            </div>
            <Week
              title={"Due Today"}
              data={todayArr.length ? todayArr.map( task => {
                return (
                  <ul>
                    <li> {task}</li>
                  </ul>
                );
              }) : "Nothing Due Today"}
            />
            <Week
              title={"Due Tomorrow"}
              data={tomorrowArr.length ? tomorrowArr.map( task => {
                return (
                <ul>
                 <li> {task}</li>
                  </ul>
                  )

              }) : "Nothing Due Tomorrow"}
            />
            <Week
              title={"Due Rest of this week"}
              data={
                weekArr.length ? weekArr.map( task => {
                  return (
                    <ul>
                      <li> {task}</li>
                    </ul>
                  );
                }) : "Nothing due the rest of this week"
              }
            />
          </section>
          <section className="data-week">
            <NewsList/>
          </section>
        </div>
      </div>
    );
}

export default Overview
