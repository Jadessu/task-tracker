import React, { useState } from "react";
import Task from "../Task";

export const Tasks = () => {
  return (
    <div>
      <Task title="All Tasks" />
    </div>
  );
};
export const InProgress = () => {
  return (
    <div>
      <h1> Tasks In Progress</h1>
    </div>
  );
};
export const Completed = () => {
  return (
    <div>
      <h1> Tasks Completed</h1>
    </div>
  );
};
export const OnHold = () => {
  return (
    <div>
      <h1> Tasks on Hold</h1>
    </div>
  );
};
