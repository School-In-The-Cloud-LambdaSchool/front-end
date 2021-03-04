import React, {useState, useEffect} from 'react';
import axiosWithAuth from '../../utils/axiosWithAuth';
import VolunteerCard from './VolunteerCard';

const AdminDashboard = () => {
    const [ volunteers, setVolunteers ] = useState([]);

    useEffect( () => {
        fetchUsers();
    },[]);

    const fetchUsers = () => {
        axiosWithAuth()
        .get(`api/students/volunteers`)
        .then( res => {
            setVolunteers(res.data.data);
        })
        .catch( err => { console.log("Admin get volunteers:", err.errMessage, err.message); })
    }

    return (
        <div className="container">
            <h2>Volunteers</h2>
            <h3>Click on a volunteer to see their students</h3>
            { volunteers ? 
            volunteers.map( user => {
                return <VolunteerCard user={user} key={user.volunteerId} setVolunteers={setVolunteers} volunteers={volunteers} />;
            })
            :   <div>
                    <h2>Waiting for volunteers...</h2>
                </div>
            }
        </div>
    )
}

export default AdminDashboard
