import React from 'react'
import axiosWithAuth from '../../utils/axiosWithAuth';

const TaskCard = ({task, user, handleTaskGet}) => {
    return (
            <div className="container task"> 
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
    )
}

export default TaskCard
