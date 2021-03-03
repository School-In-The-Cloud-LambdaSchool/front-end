import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axiosWithAuth from '../../utils/axiosWithAuth';

export default function StudentCard({student}) {
  const { tasks, setTasks } = useState();

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

  return(
    <div>
        <h3>{student.firstName} {student.lastName}</h3>
        <p>Student Id #{student.studentId}</p>
        <div>
          <h4>Tasks:</h4>
          {tasks.map( task => {
            <p>{task.task}</p>
          })}
        </div>
    </div>
  );
}



