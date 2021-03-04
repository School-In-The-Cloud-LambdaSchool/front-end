import React from 'react';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from '../../utils/axiosWithAuth';

const VolunteerCard = ({user, setVolunteers}) => {
    const history = useHistory();

    const handleStudentGet = (evt) => {
      evt.preventDefault()
      fetchUsers();
      history.push(`/admin/${user.volunteerId}/students`);
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
        <div onClick={handleStudentGet} >
          <h3>{user.firstName} {user.lastName}</h3>
          <p>Volunteer Id #{user.volunteerId}</p>          
        </div>
      </div>
    );
  }

export default VolunteerCard
