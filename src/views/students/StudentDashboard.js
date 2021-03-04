import React, {useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom';
import axiosWithAuth from '../../utils/axiosWithAuth';

// GET & PUT REQUEST
// displays logged in students tasks on render
// option to change volunteer which loads a new component that loads all volunteers on cards. when you click the card it changes students volunteer to that one
const StudentDashboard = () => {
	const {studentId} = useParams();
	const [student, setStudent] = useState({});
	const [volunteer, setVolunteer] = useState({});
	const [tasks, setTasks] = useState([]);
	const {push} = useHistory();

	useEffect(() => {
		handleTaskGet(studentId);
		handleStudentGet(studentId);
	},[studentId])

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

	const handleStudentGet = (studentId) => {
		axiosWithAuth()
		.get(`api/students/${studentId}`)
		.then(student => {
			setStudent(student.data.data);
			axiosWithAuth()
				.get(`api/students/volunteers/${student.data.data.volunteerId}`)
				.then(volunteer => {
					setVolunteer(volunteer.data.data)
				})
				.catch(err => {
					console.log("Get Student's Volunteer: ", err.errMessage, err.message);
				})
		})
		.catch(err => {
			console.log('Get Student: ', err.errMessage, err.message);
		})
	}

	return (
		<div className="container">
			<h2>Welcome, {student.firstName}</h2>
			<h3>Current Volunteer: {volunteer.firstName} {volunteer.lastName}</h3>
			<button onClick={(event)=>{
				event.preventDefault();
				push(`/student/update-volunteer/${studentId}`)
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
