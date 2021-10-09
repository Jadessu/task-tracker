import React, { useState } from "react";
import Task from "../Task";
import { requests, fetchCompleted, fetchInProgress, fetchNotStarted, fetchonHold, fetchAll } from "../request";
export const Tasks = () => {
  return (
    <div>
      <Task title="All Tasks" fetchUrl={fetchAll} />
    </div>
  );
};
export const InProgress = () => {
  return (
    <div>
      <Task title="Tasks In Progress" fetchUrl={fetchInProgress}/>
    </div>
  );
};
export const Completed = () => {
  return (
    <div>
      <Task title="Tasks Completed" fetchUrl={fetchCompleted}/>
    </div>
  );
};
export const OnHold = () => {
  return (
    <div>
     <Task title="Tasks On Hold" fetchUrl={fetchonHold}/>
    </div>
  );
};
