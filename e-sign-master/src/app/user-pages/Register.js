import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useHttpClient } from '../shared2/hooks/http-hook';
// import { AuthContext } from '../shared2/context/auth-context';
// import Spinner from '../shared/Spinner';

const Register = () => {
	// const auth = useContext(AuthContext);
	// const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [ user, setUser ] = useState({
		name: '',
		email: '',
		password: ''
	});
	const { name, email, password } = user;
	const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
	const onSubmit = async (event) => {
		// 	event.preventDefault();
		// 	console.log(email);
		// 	try {
		// 		const responseData = await sendRequest(
		// 			'http://localhost:5000/signup',
		// 			'POST',
		// 			JSON.stringify({
		// 				name,
		// 				email,
		// 				password
		// 			}),
		// 			{
		// 				'Content-Type': 'application/json'
		// 			}
		// 		);
		// 		auth.login(responseData.userId, responseData.token);
		// 	} catch (err) {}
	};

	return (
		<div>
			{/* {isLoading && <Spinner />} */}
			{/* {error && ( 
			<div className="alert alert-danger" role="alert">
				 {error} 
			</div>
			 )} */}
			<div className="d-flex align-items-center auth px-0">
				<div className="row w-100 mx-0">
					<div className="col-lg-4 mx-auto">
						<div className="auth-form-light text-left py-5 px-4 px-sm-5">
							<div className="brand-logo">
								<img src={require('../../assets/images/logo.svg')} alt="logo" />
							</div>
							<h4>New here?</h4>
							<h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6>
							<form className="pt-3" onSubmit={onSubmit}>
								<div className="form-group">
									<input
										type="text"
										placeholder="Username"
										className="form-control"
										name="name"
										onChange={onChange}
										value={name}
									/>
								</div>
								<div className="form-group">
									<input
										type="email"
										placeholder="email"
										size="lg"
										className="form-control"
										name="email"
										onChange={onChange}
										value={email}
									/>
								</div>
								{/* <div className="form-group">
										<select className="form-control " id="exampleFormControlSelect2">
											<option>Country</option>
											<option>United States of America</option>
											<option>United Kingdom</option>
											<option>India</option>
											<option>Germany</option>
											<option>Argentina</option>
										</select>
									</div> */}
								<div className="form-group">
									<input
										type="password"
										placeholder="Password"
										size="lg"
										className="form-control "
										name="password"
										onChange={onChange}
										value={password}
									/>
								</div>
								<div className="mb-4">
									<div className="form-check">
										<label className="form-check-label text-muted">
											<input type="checkbox" className="form-check-input" />
											<i className="input-helper" />
											I agree to all Terms & Conditions
										</label>
									</div>
								</div>
								<div className="mt-3">
									<button
										className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
										type="submit"
									>
										SIGN UP
									</button>
								</div>
								<div className="text-center mt-4 font-weight-light">
									Already have an account?{' '}
									<Link to="/login" className="text-primary">
										Login
									</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
