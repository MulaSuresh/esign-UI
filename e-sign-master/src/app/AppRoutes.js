import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import Spinner from './shared/Spinner';

import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';
import Footer from './shared/Footer';
const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const Profile = lazy(() => import('./profile/Profile'));
const Login = lazy(() => import('./user-pages/Login'));
const Register1 = lazy(() => import('./user-pages/RegisterAs'));
const Error404 = lazy(() => import('./user-pages/Error404'));

const AppRoutes = () => {
	const { token, login, logout, email } = useAuth();
	let routes;
	if (token) {
		routes = (
			<React.Fragment>
				<Route exact path="/register" component={Register1} />
				<Route exact path="/login" component={Login} />
				<div className="container-scroller">
					<Navbar />
					<div className="container-fluid page-body-wrapper">
						<Sidebar />
						<div className="main-panel">
							<div className="content-wrapper">
								<Switch>
									<Route exact path="/profile" component={Profile} />
									<Route exact path="/user-pages/error-404" component={Error404} />

									<Route exact path="/dashboard" component={Dashboard} />
									<Redirect to="/dashboard" />
								</Switch>
							</div>
							<Footer />
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	} else {
		routes = (
			<Switch>
				<Route exact path="/user-pages/error-404" component={Error404} />
				<Route path="/register" component={Register1} />
				<Route path="/login" component={Login} />
				<Redirect to="/login" />
			</Switch>
		);
	}
	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token: token,
				email: email,
				login: login,
				logout: logout
			}}
		>
			<Suspense fallback={<Spinner />}>{routes}</Suspense>
		</AuthContext.Provider>
	);
};

export default AppRoutes;
