import React from 'react';
import { useHistory } from 'react-router-dom';

export default function VolunteerCard({user, setRefresh}) {
  const history = useHistory();

  const handleStudentGet = (volunteerId) => {
    setRefresh(true);
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