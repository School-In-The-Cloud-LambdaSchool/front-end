import React from 'react'
import {useHistory, useParams} from 'react-router-dom';
import axiosWithAuth from '../../utils/axiosWithAuth';

const AllTasks = ({task}) => {
    const {push} = useHistory();
    const {volunteerId} = useParams();

    return (
        <div onClick={ () => {
            console.log("taskId:", task.taskId, "volunteerId:", volunteerId)
            axiosWithAuth()
            .post(`api/volunteers/add-task-pair`, {taskId: task.taskId, volunteerId: volunteerId} )
            .then( res => {
              push(`/admin`);
            })
            .catch( err => { 
              console.log("Admin set task pair:", err.errMessage, err.message); 
            })
          }} >
            <h3>{task.task}</h3>
        </div>
    )
}

export default AllTasks
