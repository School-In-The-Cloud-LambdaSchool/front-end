import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axiosWithAuth from '../../utils/axiosWithAuth';
import StudentCard from './StudentCard';

const AdminStudents = () => {
  const { volunteerId } = useParams();
  const { students, setStudents } = useState();

  useEffect(() => {
    axiosWithAuth()
      .get(`https://school-in-the-cloud-tt16.herokuapp.com/api/volunteers/find-students/${volunteerId}`)
      .then( res => {
          setStudents(res.data.data);
      })
      .catch( err => { 
        console.log("Admin get Students:", err.errMessage, err.message); 
      });
  },[]);

  return (
    <div>
      <h2>Volunteer Id #{volunteerId}'s Students</h2>
      {students.map( student => {
        return (
          <StudentCard student={student} />
        );
      })}
    </div>
  )
}

export default AdminStudents;
