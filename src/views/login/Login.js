import React, { Component } from "react";
import axios from "axios";
const initialForm = {
	username: "",
	password: "",
	role: "",

	////////// form validation/////////
	usernameError: "",
	passwordError: "",
	roleError: "",
	loginMessage: "",
};
class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			role: "",

			////////// form validation/////////
			usernameError: "",
			passwordError: "",
			roleError: "",

			///////////log in achieved//////
		};
	}
	validate = () => {
		let usernameError = "";
		let passwordError = "";
		let roleError = "";

		if (this.state.username.length < 5) {
			usernameError = "Username must be 6 characters long";
		}
		if (usernameError) {
			this.setState({ usernameError });
			return false;
		}
		if (this.state.password.length <= 7) {
			passwordError = "Password must be 8 characters long";
		}

		if (passwordError) {
			this.setState({ passwordError });
			return false;
		}
		if (this.state.role === "") {
			roleError = "Please Choose a Role";
		}
		if (roleError) {
			this.setState({ roleError });
			return false;
		}

		return true;
	};

	handleChange = (event) => {
		this.setState({ ...this.state, [event.target.name]: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const isValid = this.validate();
		if (isValid) {
			console.log(this.state);
			this.setState(initialForm);
		}
		const login_Info = {
			username: this.state.username,
			password: this.state.password,
			role: this.state.role,
		};
		console.log("logininfo", login_Info);

		axios
			.post(
				`https://school-in-the-cloud-tt16.herokuapp.com/api/auth/login`,
				login_Info
			)
			.then((res) => {
				window.localStorage.setItem("token", res.data.token)
				console.log(res);
				console.log(res.data);
				if ( res.data.role === "admin") {
					window.location.href = "/admin"
				} else if (  res.data.role === "volunteer") {
					window.location.href = `/volunteer/${res.data.volunteerId}`
				} else if (  res.data.role === "student") { //student path
					window.location.href = `/student/${res.data.studentId}`
				} else {
					console.log("login role",  res.data.role)
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	render() {
		const {
			username,
			password,
			role,
			usernameError,
			passwordError,
			roleError,
			loginMessage,
		} = this.state;
		return (
			<div>
				<div className="login">
					<div>
						<h1> Welcome to the School in the Cloud</h1>

						<h3>Login to Your Account</h3>
					</div>
					<div>
						<img 
							className="login-image"
							alt="Student in library stacks."
							src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
							width="1000x"
						/>
						<h1>{loginMessage}</h1>
					</div>
					<form onSubmit={this.handleSubmit} className="login-form">
						<div className="form-group">
							<label>Username: 
							<input
								name="username"
								type="text"
								value={username}
								onChange={this.handleChange}
							/>
							<div>{usernameError}</div>
							</label>
							<label>Password: 
							<input
								name="password"
								type="password"
								value={password}
								onChange={this.handleChange}
							/>
							<div>{passwordError}</div>
							</label>
						</div>
						<div className="form-group">
							<label>Choose Role: 
							<select name="role" value={role} onChange={this.handleChange}>
								<option value="">--- Select Role---</option>
								<option value="student">Student</option>
								<option value="volunteer">Volunteer</option>
								<option value="admin">Administrator</option>
							</select>
							<div>{roleError}</div>
							</label>
						</div>
						<div className="button_Div">
							<button>Log In</button>
							<h2>Or Get Started Today</h2>
							<a href="/register">Register</a>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
// disabled={disabled}
export default Login;
