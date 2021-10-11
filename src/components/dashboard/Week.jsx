import React from "react"
import { RiTaskLine } from "react-icons/ri"
import "./Week.css"

function Week({title, data}){
    console.log("this is data", data)

    return (
        <div> 
            <div className="tasks">
                <div className="title">

                {title}
                </div>
              <div className="due-items">
                 {data}
                 
              </div>
                
            </div>
        </div>

    )
}

export default Week