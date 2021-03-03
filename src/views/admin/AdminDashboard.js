import React, {useState, useEffect} from 'react';
import axiosWithAuth from '../../utils/axiosWithAuth';
import VolunteerCard from './VolunteerCard';

const AdminDashboard = () => {
    const { volunteers, setVolunteers } = useState([]);
    const { refresh, setRefresh } = useState(false);

    useEffect( () => {
        fetchUsers();
    },[]);

    if ( refresh === true ) {
        fetchUsers();
        setRefresh(false);
    }

    const fetchUsers = () => {
        axiosWithAuth()
        .get(`https://school-in-the-cloud-tt16.herokuapp.com/api/students/volunteers`)
        .then( res => {
            console.log(res.data)
            setVolunteers(res.data.data);
            console.log(volunteers)
        })
        .catch( err => { console.log("Admin get volunteers:", err.errMessage, err.message); })
    }

    return (
        <div>
            <h2>Volunteers</h2>
            <h3>Click on a volunteer to see their students</h3>
            {volunteers.map( user => {
                return <VolunteerCard user={user} setRefresh={setRefresh} />;
            })}
        </div>
    )
}

export default AdminDashboard
