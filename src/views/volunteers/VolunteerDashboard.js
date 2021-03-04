import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axiosWithAuth from '../../utils/axiosWithAuth';
import StudentCard from './StudentCard';


// displays logged in volunteers students on render
// whatever else you would like to implement
const VolunteerDashboard = () => {
  const {volunteerId} = useParams();
  const [students, setStudents] = useState([]);
  const [ tasks, setTasks ]  = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get(`api/volunteers/find-students/${volunteerId}`)
      .then(res => {
        setStudents(res.data.data);
      })
      .catch(err => {
        console.log("Volunteer gets Students: ", err.errMessage, err.message);
      });
    axiosWithAuth()
      .get(`api/students/${volunteerId}/tasks`)
      .then(res=> {
        setTasks(res.data.data)
      })
      .catch(err => {
        console.log('Student gets Tasks: ', err.errMessage, err.message);
      })
  }, [volunteerId])

  return (
    <div className="container">
      <h2>Volunteer Id #{volunteerId}'s Students</h2>
      { students.length > 0 ? students.map(student => {
        return(
            <StudentCard key={student.studentId} student={student} tasks={tasks} />
        )
      })
      : <h3>No students currently enrolled :'(</h3>
      }
    </div>
  )
}

export default VolunteerDashboard
