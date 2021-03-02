import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axiosWithAuth from '../../utils/axiosWithAuth';
import AdminAddTask from './AdminAddTask';
import VolunteerCard from './VolunteerCard';

const AdminDashboard = (props) => {
    const { volunteers, setVolunteers } = useState();

    useEffect( () => {
        fetchUsers();
    },[]);

    const fetchUsers = () => {
        axiosWithAuth()
        .get(`https://school-in-the-cloud-tt16.herokuapp.com/api/students/volunteers`)
        .then( res => {
            setVolunteers(res.data.data);
        })
        .catch( err => { console.log("Admin get volunteers:", err.errMessage, err.message); })
    }

    return (
        <div>
            <h2>Volunteers</h2>
            {volunteers.map( user => {
                return (
                    <VolunteerCard user={user} />
                )
            })}
            <AdminAddTask />
            

        </div>
    )
}

export default AdminDashboard
