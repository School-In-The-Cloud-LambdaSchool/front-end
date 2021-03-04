import React, {useEffect} from 'react';
import axiosWithAuth from '../../utils/axiosWithAuth';
import VolunteerCard from './VolunteerCard';


const Volunteers = ({volunteers, setVolunteers}) => {
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
         <div>
             <h2>Available Volunteers</h2>
             <h3>Select your Volunteer</h3>
             {volunteers ?
             volunteers.map(user => {
                 return <VolunteerCard user={user} setVolunteers={setVolunteers}/>
             })
            :   <div>
                    <h3>Loading volunteers...</h3>
                </div>
            }
         </div>
     )
 }
 
 export default Volunteers
 