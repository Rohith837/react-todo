import { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
	const navigate = useNavigate();

	const newPasswordInputRef = useRef();
	const oldPasswordInputRef = useRef();
	const ctx = useContext(AuthContext);

	const submitHandler = async (event) => {
		event.preventDefault();
		try {

			const enteredNewPassword = newPasswordInputRef.current.value;
			const enteredOldPassword = oldPasswordInputRef.current.value;

			let response = await fetch('https://backend-ielts.herokuapp.com/user', {
				method: 'PUT',
				body: JSON.stringify({
					token: ctx.token,
					oldPassword: enteredOldPassword,
					newPassword: enteredNewPassword
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			let data = await response.json();

      if (response.ok) {
				navigate('/', { replace: true });
			} else {
				throw new Error(data.error);
			}
      
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div className={classes.control}>
				<label htmlFor="old-password">Old Password</label>
				<input type="password" id="old-password" minLength="7" ref={oldPasswordInputRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor="new-password">New Password</label>
				<input type="password" id="new-password" minLength="7" ref={newPasswordInputRef} />
			</div>
			<div className={classes.action}>
				<button>Change Password</button>
			</div>
		</form>
	);
};

export default ProfileForm;
