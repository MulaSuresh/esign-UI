import React, { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';

import { AuthContext } from '../shared/context/auth-context';

const Navbar = () => {
	// const cred=localStorage.getItem('userData')
	// const em=JSON.parse(cred)
	const auth = useContext(AuthContext);

	const toggleOffcanvas = () => {
		document.querySelector('.sidebar-offcanvas').classList.toggle('active');
	};

	return (
		<nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
			<div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
				<a
					className="navbar-brand brand-logo-mini align-self-center d-lg-none"
					href="!#"
					onClick={(evt) => evt.preventDefault()}
				>
					<img src={require('../../assets/images/e-sign-mini.PNG')} alt="logo" />
				</a>
				<button
					className="navbar-toggler navbar-toggler align-self-center"
					type="button"
					onClick={() => document.body.classList.toggle('sidebar-icon-only')}
				>
					<i className="mdi mdi-menu" />
				</button>

				<ul className="navbar-nav navbar-nav-right ml-lg-auto">
					<li className="nav-item  nav-profile border-0">
						<Dropdown alignRight>
							<Dropdown.Toggle className="nav-link count-indicator bg-transparent">
								<span className="profile-text">{auth.email}</span>
								<img
									className="img-xs rounded-circle"
									src={require('../../assets/images/faces/face8.jpg')}
									alt="Profile"
								/>
							</Dropdown.Toggle>
							<Dropdown.Menu className="preview-list navbar-dropdown pb-3">
								<Dropdown.Item
									className="dropdown-item preview-item d-flex align-items-center border-0 pb-3"
									onClick={(evt) => evt.preventDefault()}
								>
									Change Password
								</Dropdown.Item>
								<Dropdown.Item
									className="dropdown-item preview-item d-flex align-items-center border-0"
									onClick={auth.logout}
								>
									Sign Out
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</li>
				</ul>
				<button
					className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
					type="button"
					onClick={toggleOffcanvas}
				>
					<span className="mdi mdi-menu" />
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
