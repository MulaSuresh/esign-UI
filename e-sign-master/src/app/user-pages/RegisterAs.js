import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import RegisterAsUser from './RegisterAsUser';
import RegisterAsCompany from './RegisterAsCompany';

class RegistrationAs extends Component {
	constructor() {
		super();
		this.state = {
			registerAsCompany: true,
			registerAsUser: false
		};
	}
	registerAsCompany = () => {
		this.setState({ registerAsCompany: true, registerAsUser: false });
	};
	registerAsUser = () => {
		this.setState({ registerAsUser: true, registerAsCompany: false });
	};
	render() {
		const { registerAsCompany, registerAsUser } = this.state;
		return (
			<React.Fragment>
			<div className="d-flex align-items-center auth px-0">
				<div className="row w-100 mx-0">
					<div className="col-lg-4 mx-auto">
						<div className="auth-form-light text-left py-5 px-4 px-sm-5">
							<div className="brand-logo">
								<img src={require('../../assets/images/logo.svg')} alt="logo" />
							</div>
							<h4>New here?</h4>
							<h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6>
                            <div className="my-4">
					<button
						onClick={this.registerAsUser}
						className={registerAsUser ? 'btn btn-primary' : 'btn btn-light'}
					>
						Register As User
					</button>
					<button
						onClick={this.registerAsCompany}
						className={registerAsCompany ? 'btn btn-success ml-4' : 'btn btn-light ml-4'}
					>
						Register As Company
					</button></div>
				
				{registerAsUser && <RegisterAsUser />}
				{registerAsCompany && <RegisterAsCompany />}
                <div className="text-center mt-4 font-weight-light">
									Already have an account?{' '}
									<Link to="/login" className="text-primary">
										Login
									</Link>
								</div>
                </div></div></div></div>
                
			</React.Fragment>
		);
	}
}

export default RegistrationAs;
