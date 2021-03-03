import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from '../../utils/axiosWithAuth';

export default function TaskPage() {
  const { studentId } = useParams();
  const { allTasks, setAllTasks } = useState([]);
  const { formValues, setFormValues } = useState({ task: "" });
  const history = useHistory();

  useEffect(() => {
    handleAllTaskGet();
  }, []);

  const handleAllTaskGet = () => {
    axiosWithAuth()
      .get(`https://school-in-the-cloud-tt16.herokuapp.com/api/api/volunteers/tasks`)
      .then( res => {
        setAllTasks(res.data.data);
      })
      .catch( err => { 
        console.log("Admin get all Tasks:", err.errMessage, err.message); 
      });
  }

  const handleAddTask = (taskId, studentId) => {
    axiosWithAuth()
      .post(`https://school-in-the-cloud-tt16.herokuapp.com/api/api/volunteers/add-task-pair`, {taskId: taskId, studentId: studentId} )
      .then( res => {
        history.push("/admin");
      })
      .catch( err => { 
        console.log("Admin set task pair:", err.errMessage, err.message); 
      });
  }

  const handleCancel = (evt) => {
    evt.preventDefault();
    history.push("/admin");
  }

  const handleChange = (evt) => {
    setFormValues({ ...formValues, [evt.target.name]: evt.target.value });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axiosWithAuth()
      .post(`https://school-in-the-cloud-tt16.herokuapp.com/api/admin/create-task`, formValues )
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
      <h2>Click A Task To Add To Students List</h2>
      {allTasks.map( task => {
        return (
          <div onClick={handleAddTask(task.taskId, studentId)} >
            <h3>{task.task}</h3>
          </div>
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