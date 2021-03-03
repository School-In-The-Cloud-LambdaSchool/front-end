import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axiosWithAuth from '../../utils/axiosWithAuth';

export default function StudentCard({student}) {
  const {volunteerId} = useParams();
  const [ tasks, setTasks ]  = useState([]);
  const history = useHistory();

  useEffect(() => {
    handleTaskGet(student.studentId);
  }, []);

  const handleTaskGet = (studentId) => {
    axiosWithAuth()
      .get(`api/students/${studentId}/tasks`)
      .then( res => {
        setTasks(res.data.data);
      })
      .catch( err => { 
        console.log("Admin get Tasks:", err.errMessage, err.message); 
      });
  }   

  const handleAddTask = (evt) => {
    evt.preventDefault();
    history.push(`/admin/add-task/${student.studentId}/${volunteerId}`);
  }

  return(
    <div>
        <h3>{student.firstName} {student.lastName}</h3>
        <p>Student Id #{student.studentId}</p>
        <div>
          <h4>Tasks:</h4>
          {tasks.map( task => {
            return (
              <div> 
                <p>{task.task}</p>
                <button onClick={ (evt) => {
                  evt.preventDefault()
                  axiosWithAuth()
                    .delete(`api/volunteers/task-pairs/${task.taskPairId}`)
                    .then( res => {
                      handleTaskGet(student.studentId);
                    })
                    .catch( err => { 
                      console.log("Admin delete Task:", err.errMessage, err.message); 
                    });
                }} >Delete Task</button>
              </div>
            );
          })}
          <button onClick={handleAddTask} >Add Another Task</button>
        </div>
    </div>
  );
}



