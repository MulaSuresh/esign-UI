import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

 class RegisterAsCompany extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			mobileNumber: '',
			otp: '',
			callbackURL: '',
			listOfIP: '',
			register: true,
			enterOtp: false,
			otpValid: false
		};
	}
	submitHandler = (event) => {
		event.preventDefault();
		const { name, email, password, mobileNumber,callbackURL,listOfIP } = this.state;
		 this.setState({ register: false, enterOtp: true });
		axios({
			method: 'POST',
			url: 'http://localhost:9016/esign/registercompany',
			contentType: 'application/json',
			headers:{'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbm9qa3VtYXJrb2trdWxhMTdAZ21haWwuY29tIiwicGFzc3dvcmQiOiJhZ3JlZW1lbnQ3In0=.jouO1S9KkaYwesErRBTf0Di10XSWD2g70neWtGUoA'},
			data: {
				"JSONFile":{
				'company_name': name,
				'company_email': email,
				'mobile_number': mobileNumber,
				'callback_url': callbackURL,
				'ip_list': listOfIP
				}

			}
		})
			.then((result) => {
				console.log(result);
				axios
				.post('http://localhost:9015/esign/sendotp', email, {
					headers: { 'Content-Type': 'text/plain' }
				})
				.then((result) => {
					console.log(result);
					this.setState({ errorMessage: 'Success',register: false, enterOtp: true });
				})
				.catch((e) => {
					window.alert(e);
				});
			})
			.catch((e) => {
				this.setState({ errorMessage: 'Username or Password Invalid' });
			});
	};
	
	changeHandler = (event) => {
		this.setState({ ...this.state, [event.target.name]: event.target.value });
	};
	otpValidation = (event) => {
		event.preventDefault();
		const { email, otp} = this.state;
		// invalid
		axios({
			method: 'POST',
			url: 'http://localhost:9015/esign/verifyotp',
			contentType: 'application/json',
			data: {
				email,
				otp
			}
		})
			.then((result) => {
				//access the results here....
				console.log(result);
				this.setState({ otpValid: true, enterOtp: false });
				// if (result.data.responseData.isOTPValid === true) {
				// 	this.setState({ isLoggedin: true });
				// }
			})
			.catch((e) => {
				this.setState({ errorMessage: 'Username or Password Invalid' });
			});
		// sucess
		// failure
	};
	render() {
		return (
			<React.Fragment>
										{this.state.register && (
				<form onSubmit={this.submitHandler}>
					<div>
						<div className="form-group ">
							{/* {this.state.errorMessage && <h3 className="error"> {this.state.errorMessage} </h3>} */}
							<label htmlFor="name">Name</label>
							<input
								className="form-control"
								id="name"
								name="name"
								type="text"
								placeholder="Enter Name"
								value={this.state.name}
								onChange={this.changeHandler}
								// required="Please enter your Name"
							/>
						</div>
						<div className="form-group ">
							{/* {this.state.errorMessage && <h3 className="error"> {this.state.errorMessage} </h3>} */}
							<label htmlFor="email">Email</label>
							<input
								className="form-control"
								id="email"
								name="email"
								type="email"
								placeholder="Enter Email"
								value={this.state.email}
								onChange={this.changeHandler}
								// required="Please enter your Email"
							/>
						</div>
						<div className="form-group ">
							{/* {this.state.errorMessage && <h3 className="error"> {this.state.errorMessage} </h3>} */}
							<label htmlFor="mobileNumber">Mobile Number</label>
							<input
								className="form-control"
								id="mobileNumber"
								name="mobileNumber"
								type="number"
								placeholder="Enter Mobile Number"
								value={this.state.mobileNumber}
								onChange={this.changeHandler}
								// required="Please enter your Mobile Number"
							/>
						</div>
						<div className="form-group ">
							<label htmlFor="callbackURL">Callback URL</label>
							<input
								className="form-control"
								id="callbackURL"
								name="callbackURL"
								type="text"
								placeholder="Enter Callback URL"
								value={this.state.callbackURL}
								onChange={this.changeHandler}
								// required="Please enter your Mobile Number"
							/>
						</div>
						<div className="form-group ">
							<label htmlFor="listOfIP">List Of IP</label>
							<input
								className="form-control"
								id="listOfIP"
								name="listOfIP"
								type="text"
								placeholder="Enter List Of IP"
								value={this.state.listOfIP}
								onChange={this.changeHandler}
								// required="Please enter your Mobile Number"
							/>
						</div>
						<button className="btn btn-success btn-block btn-lg" type="submit">
							Genertae OTP
						</button>
					</div>
				</form>)}
				{this.state.otpValid && (
									<div>
										<h2>Congratulations !!</h2>
										<br />
										<h4>
											Your Registration is successful Please check your email for Login
											Credentials
										</h4>
										<p style={{ color: 'blue' }}>
											<Link to="/">click here to Login </Link>
										</p>
									</div>
								)}
								{this.state.enterOtp && (
									<form onSubmit={this.submitHandler1}>
										<h3>Please enter OTP sent to {this.state.email}</h3>
										<div className="form-group ">
											{/* {this.state.errorMessage && <h3 className="error"> {this.state.errorMessage} </h3>} */}
											<label htmlFor="otp">OTP</label>
											<input
												className="form-control"
												id="otp"
												name="otp"
												type="number"
												placeholder="Enter OTP"
												value={this.state.otp}
												onChange={this.changeHandler}
												required="please enter OTP"
											/>
										</div>
										<button
											type="button"
											className="btn btn-success btn-block btn-lg"
											onClick={this.otpValidation}
										>
											Submit
										</button>
									</form>
								)}
								
                                </React.Fragment>
			
		);
	}
}

export default RegisterAsCompany;
