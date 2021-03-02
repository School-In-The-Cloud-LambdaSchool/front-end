import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function VolunteerCard({user}) {
  const history = useHistory();

  const handleStudentGet = (volunteerId) => {
    history.push(`/admin/${volunteerId}/students`);
  }

  return(
    <div>
      <div onClick={handleStudentGet(user.volunteerId)} >
        <h3>{user.firstName} {user.lastName}</h3>
        <p>Volunteer Id #{user.volunteerId}</p>          
      </div>
    </div>
  );
}