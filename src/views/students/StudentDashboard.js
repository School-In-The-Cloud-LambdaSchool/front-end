import React, {useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom';
import axiosWithAuth from '../../utils/axiosWithAuth';

// GET & PUT REQUEST
// displays logged in students tasks on render
// option to change volunteer which loads a new component that loads all volunteers on cards. when you click the card it changes students volunteer to that one
const StudentDashboard = () => {
	const {studentId} = useParams();
	const [student, setStudent] = useState({});
	const [volunteer, setVolunteer] = useState([]);
	const [tasks, setTasks] = useState([]);
	const {push} = useHistory();

	useEffect(() => {
		handleTaskGet(studentId);
	},[])

	const handleTaskGet = (studentId) => {
		axiosWithAuth()
		.get(`api/students/${studentId}/tasks`)
		.then(res=> {
			setTasks(res.data.data)
		})
		.catch(err => {
			console.log('Student gets Tasks: ', err.errMessage, err.message);
		})
	}

	return (
		<div>
			<h2>Welcome, {student.firstName}</h2>
			<h3>Current Volunteer: </h3>
			<button onClick={(event)=>{
				event.preventDefault();
				push(`/student/update-volunteer/${studentId}`)
				// axiosWithAuth()
				// .put(`api/students/${studentId}`, {needMeeting: false, volunteerId: volunteers.volunteerId})
				// .then(res => {
				// 	console.log(res)
				// 	push(`/student/update-volunteer/${studentId}`)
				// })
				// .catch(err  => {
				// 	console.log("Student change Volunteer: ", err.errMessage, err.message); 
				// })
			}}>Change Volunteer</button>
			<h3>Your Tasks:</h3>
			{tasks.map(task => {
				return(
					<div>
						<p>{task.task}</p>
					</div>
				)
			})}
		</div>
	)
}

export default StudentDashboard
