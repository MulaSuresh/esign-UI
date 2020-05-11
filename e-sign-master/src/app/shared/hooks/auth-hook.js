import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
	const [ token, setToken ] = useState(false);
	const [ tokenExpirationDate, setTokenExpirationDate ] = useState();
	const [ email, setEmail ] = useState(false);

	const login = useCallback((email, token, expirationDate) => {
		setToken(token);
		setEmail(email);
		const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
		setTokenExpirationDate(tokenExpirationDate);
		localStorage.setItem(
			'userData',
			JSON.stringify({
				email: email,
				token: token,
				expiration: tokenExpirationDate.toISOString()
			})
		);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setTokenExpirationDate(null);
		setEmail(null);
		localStorage.removeItem('userData');
	}, []);

	useEffect(
		() => {
			if (token && tokenExpirationDate) {
				const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
				logoutTimer = setTimeout(logout, remainingTime);
			} else {
				clearTimeout(logoutTimer);
			}
		},
		[ token, logout, tokenExpirationDate ]
	);

	useEffect(
		() => {
			const storedData = JSON.parse(localStorage.getItem('userData'));
			if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
				login(storedData.email, storedData.token, new Date(storedData.expiration));
			}
		},
		[ login ]
	);

	return { token, login, logout, email };
};
