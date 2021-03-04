import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from '../../utils/axiosWithAuth';

export default function VolunteerCard({user, setVolunteers, volunteers}) {
  const history = useHistory();
  const [ tasks, setTasks ]  = useState([]);

  useEffect(() => {
    handleTaskGet(user.volunteerId);
  }, []);

  const handleStudentGet = (evt) => {
    evt.preventDefault()
    fetchUsers();
    history.push(`/admin/${user.volunteerId}/students`);
  }

  const fetchUsers = () => {
    axiosWithAuth()
    .get(`api/students/volunteers`)
    .then( res => {
      // console.log(res.data.data)
      setVolunteers(res.data.data);
    })
    .catch( err => { console.log("Admin get volunteers:", err.errMessage, err.message); })
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
      <div>
        <h3>{user.firstName} {user.lastName}</h3>
        <p>Volunteer Id #{user.volunteerId}</p>
        <div>
          <h4>Tasks:</h4>
          { tasks.length > 0 ? tasks.map( task => {
            return (
              <div> 
                <p>{task.task}</p>
                <button onClick={ (evt) => {
                  evt.preventDefault()
                  axiosWithAuth()
                    .delete(`api/volunteers/task-pairs/${task.taskPairId}`)
                    .then( res => {
                      handleTaskGet(user.volunteerId);
                    })
                    .catch( err => { 
                      console.log("Admin delete Task:", err.errMessage, err.message); 
                    });
                }} >Delete Task</button>
              </div>
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