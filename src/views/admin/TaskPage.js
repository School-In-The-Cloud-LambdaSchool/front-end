import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import axiosWithAuth from '../../utils/axiosWithAuth';
import AllTasks from './AllTasks';

export default function TaskPage() {
  const { volunteerId } = useParams();
  const [ allTasks, setAllTasks ] = useState([]);
  const [ formValues, setFormValues ] = useState({ task: "" });
  const history = useHistory();

  useEffect(() => {
    handleAllTaskGet();
  }, []);

  const handleAllTaskGet = () => {
    axiosWithAuth()
      .get(`api/volunteers/tasks`)
      .then( res => {
        setAllTasks(res.data.data);
      })
      .catch( err => { 
        console.log("Admin get all Tasks:", err.message.errMessage, err.message); 
      });
  }

  const handleCancel = (evt) => {
    evt.preventDefault();
    history.push(`/admin/${volunteerId}/students`);
  }

  const handleChange = (evt) => {
    setFormValues({ ...formValues, [evt.target.name]: evt.target.value });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axiosWithAuth()
      .post(`api/admin/create-task`, formValues )
      .then( res => {
        handleAllTaskGet();
      })
      .catch( err => { 
        console.log("Admin create new task:", err.errMessage, err.message); 
      });
    setFormValues({ task: "" });
  }

  return(
    <div>
      <h2>Click A Task To Add To Volunteers List</h2>
      {allTasks.map( task => {
        return (
          <AllTasks key={task.taskId} task={task} />
        );
      })}
      <button onClick={handleCancel} >Cancel</button>
      <form onSubmit={handleSubmit} >
        <h2>Create A New Task</h2>
        <label> Task
          <input
                  name="task"
                  type="text"
                  value={formValues.task}
                  onChange={handleChange}
                />
          </label>
        <button>Create</button>
      </form>
    </div>
  );
}