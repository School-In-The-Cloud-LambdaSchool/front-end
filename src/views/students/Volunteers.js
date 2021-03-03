import React, {useState} from 'react';
import axiosWithAuth from '../../utils/axiosWithAuth';
import VolunteerCard from './VolunteerCard';
 
 const Volunteers = () => {
     const [volunteers, setVolunteers] = useState([]);

     return (
         <div>
             <h2>Available Volunteers</h2>
             <h3>Select your Volunteer</h3>
             {volunteers ?
             volunteers.map(user => {
                 return <VolunteerCard />
             })
            :   <div>
                    <h3>Loading volunteers...</h3>
                </div>
            }
         </div>
     )
 }
 
 export default Volunteers
 