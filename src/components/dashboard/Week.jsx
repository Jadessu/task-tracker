import React from "react"
import "./Week.css"

function Week({title, data}){
    console.log(data)

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