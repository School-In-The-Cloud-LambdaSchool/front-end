import React, {useState} from 'react'
import { useParams, useHistory } from "react-router-dom";
import { axiosWithAuth } from '../../utils/axiosWithAuth';

const initialTaskState = {
    taskId: null,
    task: ''
}

const AdminAddTask = () => {
    const [newTask, setNewTask] = useState(initialTaskState);

    const {push} = useHistory();

    const handleChange = event => {
        setNewTask({...newTask, [event.target.name]: event.target.value});
    }

    const handleSubmit = event => {
        event.preventDefault();
        axiosWithAuth()
        .post(`https://school-in-the-cloud-tt16.herokuapp.com/api/admin/create-task`, newTask)
        .then(res => {
            console.log('Admin New Task Response: ', res)
            setNewTask(res.data.data)
        })
        .catch( err => { console.log("Admin New Task: ", err.errMessage, err.message); })
        setNewTask(initialTaskState);
        push(`/admin/students`)
    }

    return (
        <div>
            <h3>Add New Task</h3>
            <form action="" onSubmit={handleSubmit}>    
                <label>
                    <input 
                        type="text"
                        name='task'
                        placeholder='Enter Task Here...'
                        onChange={handleChange}
                    />
                </label>
                <button>Create Task</button>
            </form>
        </div>
    )
}

export default AdminAddTask
