import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			role: "",
		};
	}

	handleChange = (event) => {
		this.setState({ ...this.state, [event.target.name]: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const login_Info = {
			username: this.state.username,
			password: this.state.password,
		};
		console.log("logininfo", login_Info);

		axios
			.post("api/auth/login", login_Info)
			.then((res) => {
				console.log(res);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	render() {
		const { username, password, role } = this.state;
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
							</label>
							<label>Password: 
							<input
								name="password"
								type="text"
								value={password}
								onChange={this.handleChange}
							/>
							</label>
						</div>
						<div className="form-group">
							<label>Choose Role: 
							<select name="role" value={role} onChange={this.handleChange}>
								<option value="">--- Select Role---</option>
								<option value="student">Student</option>
								<option value="volunteer">Volunteer</option>
								<option value="admin">Administaror</option>
							</select>
							</label>
						</div>
						<div className="button_Div">
							<button>Login</button>
							<h2>Or Get Started Today</h2>
							<a href="/register">Register</a>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default Login;
