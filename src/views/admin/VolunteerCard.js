import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from '../../utils/axiosWithAuth';
import TaskCard from './TaskCard';

export default function VolunteerCard({user}) {
  const history = useHistory();
  const [ tasks, setTasks ]  = useState([]);

  useEffect(() => {
    handleTaskGet(user.volunteerId);
  }, [user.volunteerId]);

  const handleStudentGet = (evt) => {
    evt.preventDefault()
    history.push(`/admin/${user.volunteerId}/students`);
  }

  const handleTaskGet = (volunteerId) => {
    axiosWithAuth()
      .get(`api/students/${volunteerId}/tasks`)
      .then( res => {
        setTasks(res.data.data);
      })
      .catch( err => { 
        console.log("Admin get Tasks:", err.errMessage, err.message); 
      });
  } 

  const handleAddTask = (evt) => {
    evt.preventDefault();
    history.push(`/admin/add-task/${user.volunteerId}`);
  }

  return(
    <div>
      <div className="container">
        <h3>{user.firstName} {user.lastName}</h3>
        <p>Volunteer Id #{user.volunteerId}</p>
        <div>
          <h4>Tasks:</h4>
          { tasks.length > 0 ? tasks.map( task => {
            return (
             <TaskCard key={task.taskPairId} user={user} task={task} handleTaskGet={handleTaskGet} />
            );
          })
          : <p>No Tasks Assigned Yet</p>
          }
          <button onClick={handleAddTask} >Add Another Task</button>
        </div>
        <button onClick={handleStudentGet} >View Students</button>
      </div>
    </div>
  );
}