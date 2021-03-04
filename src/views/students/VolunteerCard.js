import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axiosWithAuth from '../../utils/axiosWithAuth';

const VolunteerCard = ({user, setVolunteers}) => {
    const {studentId} = useParams();
    const history = useHistory();

    const handleStudentGet = (evt) => {
      evt.preventDefault()
      fetchUsers();
      history.push(`/student/${studentId}`);
    }
  
    const fetchUsers = () => {
      axiosWithAuth()
      .get(`api/students/volunteers`)
      .then( res => {
        // console.log(res.data.data)
        setVolunteers(res.data.data);
      })
      .catch( err => { console.log("Admin get volunteers:", err.errMessage, err.message); })
  }
  
    return(
      <div>
        <div>
          <h3>{user.firstName} {user.lastName}</h3>
          <p>Volunteer Id #{user.volunteerId}</p>      
          <button onClick={handleStudentGet}>Select Volunteer</button>    
        </div>
      </div>
    );
  }

export default VolunteerCard
