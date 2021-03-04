import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axiosWithAuth from '../../utils/axiosWithAuth';
import VolunteerCard from './VolunteerCard';


const Volunteers = () => {
    const [volunteers, setVolunteers] = useState([]);
    const {push} = useHistory();
    const {studentId} = useParams();

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
                 return <VolunteerCard key={user.volunteerId} user={user} setVolunteers={setVolunteers}/>
             })
            :   <div>
                    <h3>Loading volunteers...</h3>
                </div>
            }
            <button onClick={(event)=> {
                event.preventDefault()
                push(`/student/${studentId}`)}}
            >Cancel</button>
         </div>
     )
 }
 
 export default Volunteers
 