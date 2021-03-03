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
				`https://school-in-the-cloud-tt16.herokuapp.com/api/auth/login-${this.state.role}`,
				login_Info
			)
			.then((res) => {
				console.log(res);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});


		// this.setState(initialForm);

			if (this.state.role === "admin") {
				
			} else if ( this.state.role === "volunteer") {

			} else { //student path

			}


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
				<div>
					<div>
						<h1> Welcome to the School in the Cloud</h1>

						<span>Login to Your Account</span>
					</div>
					<div>
						<img
							alt=""
							src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
							width="1000x"
						/>
						<h1>{loginMessage}</h1>
					</div>
					<form onSubmit={this.handleSubmit}>
						<div>
							<label>Username: </label>
							<input
								name="username"
								type="text"
								value={username}
								onChange={this.handleChange}
							/>
							<div>{usernameError}</div>
						</div>
						<div>
							<label>Password: </label>
							<input
								name="password"
								type="password"
								value={password}
								onChange={this.handleChange}
							/>
							<div>{passwordError}</div>
						</div>
						<div>
							<label>Choose Role: </label>
							<select name="role" value={role} onChange={this.handleChange}>
								<option value="">--- Select Role---</option>
								<option value="student">Student</option>
								<option value="volunteer">Volunteer</option>
								<option value="admin">Administaror</option>
							</select>
							<div>{roleError}</div>
						</div>
						<div className="button_Div">
							<button>Submit</button>
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
