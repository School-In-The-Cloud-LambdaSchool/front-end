import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from '../../utils/axiosWithAuth';

export default function StudentCard({student}) {
  const { tasks, setTasks } = useState([]);
  const history = useHistory();

  useEffect(() => {
    handleTaskGet(student.studentId);
  }, []);

  const handleTaskGet = (studentId) => {
    axiosWithAuth()
      .get(`https://school-in-the-cloud-tt16.herokuapp.com/api/students/${studentId}/tasks`)
      .then( res => {
        setTasks(res.data.data);
      })
      .catch( err => { 
        console.log("Admin get Tasks:", err.errMessage, err.message); 
      });
  }

  const handleDeleteTask = (taskPairId) => {
    axiosWithAuth()
      .delete(`https://school-in-the-cloud-tt16.herokuapp.com/api/volunteers/task-pairs/${taskPairId}`)
      .then( res => {
        handleTaskGet(student.studentId);
      })
      .catch( err => { 
        console.log("Admin delete Task:", err.errMessage, err.message); 
      });
  }

  const handleAddTask = (evt) => {
    evt.preventdefault();
    history.push(`/admin/add-task/${student.studentId}`);
  }

  return(
    <div>
        <h3>{student.firstName} {student.lastName}</h3>
        <p>Student Id #{student.studentId}</p>
        <div>
          <h4>Tasks:</h4>
          {tasks.map( task => {
            <div> 
              <p>{task.task}</p>
              <p onClick={handleDeleteTask(task.taskPairId)} >Delete Task</p>
            </div>
          })}
          <button onClick={handleAddTask} >Add Another Task</button>
        </div>
    </div>
  );
}



