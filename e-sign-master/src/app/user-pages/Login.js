import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../shared/context/auth-context';
import Spinner from '../shared/Spinner';

const Login = (props) => {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [ user, setUser ] = useState({
		email: '',
		password: ''
	});

	const { email, password } = user;
	const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
	const onSubmit = async (event) => {
		event.preventDefault();
		console.log(email);
		try {
			const responseData = await sendRequest(
				'http://localhost:9015/esign/generateToken',
				'POST',
				JSON.stringify({
					email,
					password
				}),
				{
					'Content-Type': 'application/json'
				}
			);
			auth.login(responseData.email, responseData.token);
		} catch (err) {}
	};
	return (
		<div>
			{error && (
				<div className="alert alert-danger" role="alert">
					{error}
				</div>
			)}

			{isLoading && <Spinner />}
			<div className="d-flex align-items-center auth px-0">
				<div className="row w-100 mx-0">
					<div className="col-lg-4 mx-auto">
						<div className="auth-form-light text-left py-5 px-4 px-sm-5">
							<div className="brand-logo">
								<img src={require('../../assets/images/e-sign.PNG')} alt="logo" />
							</div>
							<h4>Hello! let's get started</h4>
							<h6 className="font-weight-light">Sign in to continue.</h6>
							<Form className="pt-3" onSubmit={onSubmit}>
								<Form.Group className="d-flex search-field">
									<Form.Control
										type="email"
										placeholder="email"
										size="lg"
										className="h-auto"
										name="email"
										onChange={onChange}
										value={email}
									/>
								</Form.Group>
								<Form.Group className="d-flex search-field">
									<Form.Control
										type="password"
										placeholder="Password"
										size="lg"
										className="h-auto"
										name="password"
										onChange={onChange}
										value={password}
									/>
								</Form.Group>
								<div className="mt-3">
									<button
										className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
										type="submit"
									>
										SIGN IN
									</button>
								</div>
								<div className="my-2 d-flex justify-content-between align-items-center">
									<div className="form-check">
										<label className="form-check-label text-muted">
											<input type="checkbox" className="form-check-input" />
											<i className="input-helper" />
											Keep me signed in
										</label>
									</div>
									<a
										href="!#"
										onClick={(event) => event.preventDefault()}
										className="auth-link text-black"
									>
										Forgot password?
									</a>
								</div>
								<div className="text-center mt-4 font-weight-light">
									Don't have an account?{' '}
									<Link to="/register" className="text-primary">
										Create
									</Link>
								</div>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
