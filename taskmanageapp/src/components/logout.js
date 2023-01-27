import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
	const history = useNavigate();

	useEffect(() => {
		const response = axiosInstance.post('user/logout/blacklist/', {
			refresh_token: sessionStorage.getItem('refresh_token'),
		});
		sessionStorage.removeItem('access_token');
		sessionStorage.removeItem('refresh_token');
		axiosInstance.defaults.headers['Authorization'] = null;
		history.push('/login');
	});
	return <div>Logout</div>;
}
