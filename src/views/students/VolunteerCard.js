import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axiosWithAuth from '../../utils/axiosWithAuth';

const VolunteerCard = ({user}) => {
    const {studentId} = useParams();
    const {push} = useHistory();
  
    return(
      <div>
        <div className="container">
          <h3>{user.firstName} {user.lastName}</h3>
          <p>Volunteer Id #{user.volunteerId}</p>      
          <button onClick={(evt) => {
            evt.preventDefault();
            axiosWithAuth()
              .put(`api/students/${studentId}`, {needMeeting: false, volunteerId: user.volunteerId})
              .then(res => {
                console.log(res)
                // push(`/student/update-volunteer/${studentId}`)
                push(`/student/${studentId}`);
              })
              .catch(err  => {
                console.log("Student change Volunteer: ", err.errMessage, err.message); 
              })
          }}>Select Volunteer</button>    
        </div>
      </div>
    );
  }

export default VolunteerCard
