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

			if (this.state.role === "admin") {

			} else if ( this.state.role === "volunteer") {

			} else { //student path

			}

	};
	render() {
		const { username, password, role } = this.state;
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
						</div>
						<div>
							<label>Password: </label>
							<input
								name="password"
								type="text"
								value={password}
								onChange={this.handleChange}
							/>
						</div>
						<div>
							<label>Choose Role: </label>
							<select name="role" value={role} onChange={this.handleChange}>
								<option value="">--- Select Role---</option>
								<option value="student">Student</option>
								<option value="volunteer">Volunteer</option>
								<option value="admin">Administaror</option>
							</select>
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
