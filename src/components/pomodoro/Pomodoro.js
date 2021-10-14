import React, { useState, useEffect} from "react"
// import  {formatTime, Length } from "./pomodoroService.js"
import Modal from "react-modal";
import * as GrIcons from "react-icons/gr";
import * as FiIcons from "react-icons/fi"
import * as BsIcons from "react-icons/bs"

import "./Pomodoro.css"
function Pomodoro(){
    const [ displayTime, setDisplayTime] = useState(25 *60)
    const [ breakTime, setBreakTime] = useState(5 * 60)
    const [ sessionTime, setSessionTime] = useState(25 * 60)
    const [timerOn, setTimerOn] = useState(false)
    const [onBreak, setOnBreak ] = useState(false)
    const [breakAudio, setBreakAudio] = useState(new Audio("./break.mp3"))
      const [modalIsOpen, setModalIsOpen] = useState(false);


    const playBreakSound = () => {
        breakAudio.currentTime = 0
        breakAudio.play()

    }

    const formatTime = (time) => {
        let minutes = Math.floor(time / 60)
        let seconds = time % 60
        return (
            ( minutes < 10 ? "0" + minutes : minutes) + 
            ":" + 
            (seconds < 10 ? "0" + seconds : seconds)
        )
    }

        const changeTime = (amount, type) => {
            if (type === "break"){

                if((breakTime <= 60 && amount < 0) || breakTime >= 60 * 60){
                    return
                }
                setBreakTime( (prev) => prev + amount)
            } else {
                  if((sessionTime <= 60 && amount < 0) || sessionTime >= 60 * 60){
                    return
                }
                setSessionTime( (prev) => prev + amount)
                if (!timerOn){
                    setDisplayTime(sessionTime + amount)
                }
            }
        }

        const controlTime = () => {
            let second = 1000
            let date = new Date().getTime()
            let nextDate = new Date().getTime() + second
            // let onBreakVariable = onBreak

            if (!timerOn){
                let interval = setInterval(() => {
                    date = new Date().getTime()
                    if (date > nextDate){
                        setDisplayTime( (prev) => {

                            if(prev <= 0 && !onBreak){
                                setOnBreak(true)
                                playBreakSound()
                               
                                console.log(onBreak)
                                return breakTime
                            } else if (prev <= 0 && !!onBreak){
                                playBreakSound()
                                
                                setOnBreak(false)
                                return sessionTime
                            }
                            return prev - 1
                        })
                        nextDate += second
                    }
                }, 30)
                localStorage.clear()
                localStorage.setItem("interval-id", interval)
            }
            if (timerOn){
                clearInterval(localStorage.getItem("interval-id"))
            }
            setTimerOn(!timerOn)
        }

        const resetTime = () => {
            setDisplayTime(25*60)
            setBreakTime(5*60)
            setSessionTime(25 * 60)
            setTimerOn(false)
            setOnBreak(false)
        }
        return (
            <main className="pomodoro-container">
          <div className="pomodoro-wrapper">
            <div className="main-title">
              <h1> Pomodoro Clock </h1>
            </div>
            <div className="timer-container">
              <div className="timer-session">
                <h3> {onBreak ? "Break" : "Session"} </h3>
                <span className="time">
                  <h1> {formatTime(displayTime)}</h1>
                </span>
              </div>
              <div className="pomodoro-buttons">
                <button className="play-pause" onClick={controlTime}>
                  {timerOn ? "Pause" : "Start"}
                </button>
                <button className="play-pause" onClick={resetTime}>
                  
                  Reset
                </button>
              </div>
              <button className="settings" onClick={() => setModalIsOpen(true)}>
                
                <FiIcons.FiSettings />
                Settings
              </button>
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              style={{
                overlay: {
                  backgroundColor: "rgba(0, 0,0,0.8)",
                },
                content: {
                  width: "700px",
                  height: "400px",
                  boxShadow: "0 5px 16px rgba(0, 0, 0, 0,2)",
                  background:
                    "radial-gradient(ellipse at center,  #0a2e38  0%, #000000 70%)",
                  color: "#fff",
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
                <GrIcons.GrClose className="close-icon" />
              </div>
              <div className="length-change">
                <Length
                  title={"Break Length"}
                  changeTime={changeTime}
                  type={"break"}
                  time={breakTime}
                  formatTime={formatTime}
                />

                <Length
                  title={"Session Length"}
                  changeTime={changeTime}
                  type={"session"}
                  time={sessionTime}
                  formatTime={formatTime}
                />
              </div>
              <div className="save-button-container">
                <button
                  onClick={() => setModalIsOpen(false)}
                  className="save-button"
                >
                  {" "}
                  Save
                </button>
              </div>
            </Modal>
          </div>
          </main>
        );
    }

    function Length( { title, changeTime, type, time, formatTime }){
        return (
            <div>
                <h3> {title}</h3>
                <div className="time-sets">
                    <span onClick = {() => changeTime(-60, type)}> <BsIcons.BsArrowDownSquareFill/></span>
                    <h3>{formatTime(time)}</h3>
                    <span onClick = {() => changeTime(60, type)}> <BsIcons.BsFillArrowUpSquareFill/></span>
                </div>
            </div>
        )
    }


export default Pomodoro