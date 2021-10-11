import React from "react"
import "./Card.css"
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

function Card({title, icon, amount}){

    return (
      <div className="card">
       <div className="icon">
         {icon}
       </div>
        <div className="card_inner">
          <p className="title">{title}</p>
          <span className = "amount">{amount}</span>
        </div>
      </div>
    );
}

export default Card