import React from "react";
import TaskCard from './TaskCard';


export default function StudentCard({student, tasks}) {

  return (
    <div className="container">
      <h3>{student.firstName} {student.lastName}</h3>
      <p>Student Id #{student.studentId}</p>
      <div>
        <h4>Tasks:</h4>
        {tasks.map(task => {
          return <TaskCard key={task.taskPairId} task={task} />
        })}
      </div>
    </div>
  );
}