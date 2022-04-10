import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import {
	loadingToggleAction, loginAction,
} from '../../store/actions/AuthActions';

//
import PxLogo from '../../images/PX_logo_img_text.png'

function Login(props) {
	const [email, setEmail] = useState('demo@example.com');
	let errorsObj = { email: '', password: '' };
	const [errors, setErrors] = useState(errorsObj);
	const [password, setPassword] = useState('123456');
	const dispatch = useDispatch();

	function onLogin(e) {
		e.preventDefault();
		let error = false;
		const errorObj = { ...errorsObj };
		if (email === '') {
			errorObj.email = 'Email is Required';
			error = true;
		}
		if (password === '') {
			errorObj.password = 'Password is Required';
			error = true;
		}
		setErrors(errorObj);
		if (error) {
			return;
		}
		dispatch(loadingToggleAction(true));
		dispatch(loginAction(email, password, props.history));
	}

	return (

		<div className="login-form-bx">
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-6 col-md-7 box-skew d-flex">
						<div className="authincation-content">
							<Link to="/dashboard" className="login-logo text-center">
								<img src={PxLogo} alt="" className="logo-text-img" />
							</Link>
							<div className="mb-4">
								<h3 className="mb-1 font-w600">Welcome to PatientXpress</h3>
								<p className="">Sign in by entering information below</p>
							</div>
							{props.errorMessage && (
								<div className='bg-red-300 text-red-900 border border-red-900 p-1 my-2'>
									{props.errorMessage}
								</div>
							)}
							{props.successMessage && (
								<div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
									{props.successMessage}
								</div>
							)}
							<form onSubmit={onLogin}>
								<div className="form-group">
									<label className="mb-2 ">
										<strong className="">Email</strong>
									</label>
									<input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
									{errors.email && <div className="text-danger fs-12">{errors.email}</div>}
								</div>
								<div className="form-group">
									<label className="mb-2 "><strong className="">Password</strong></label>
									<input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
									{errors.password && <div className="text-danger fs-12">{errors.password}</div>}
								</div>
								<div className="form-row d-flex justify-content-between mt-4 mb-2">
									<div className="form-group">
										<div className="custom-control custom-checkbox ml-1 ">
											<input type="checkbox" className="form-check-input" id="basic_checkbox_1" />
											<label className="form-check-label" htmlFor="basic_checkbox_1">Remember my preference</label>
										</div>
									</div>
								</div>
								<div className="text-center">
									<button type="submit" className="btn btn-primary btn-block">Sign In</button>
								</div>
							</form>
							<div className="new-account mt-2">
								<p className="mb-0">Don't have an account?{" "}
									<Link className="text-black" to="./register">Sign up</Link>
								</p>
							</div>
						</div>
					</div>
					<div className="col-lg-6 col-md-5 d-flex box-skew1">
						{/* <div className="inner-content align-self-center">
							<Link to="/dashboard" className="login-logo">
								<img src={logo} alt="" className="logo-icon mr-2"/>
								<img src={logotext} alt="" className="logo-text ml-1"/>
							</Link>
							<h2 className="m-b10 text-white">Login To You Now</h2>
							<p className="m-b40 text-white">User Experience & Interface Design Strategy SaaS Solutions</p>
							<ul className="social-icons mt-4">
								<li><Link to={"#"}><i className="fa fa-facebook"></i></Link></li>
								<li><Link to={"#"}><i className="fa fa-twitter"></i></Link></li>
								<li><Link to={"#"}><i className="fa fa-linkedin"></i></Link></li>
							</ul>
						</div> */}
					</div>
				</div>
			</div>
		</div>

	)
}

const mapStateToProps = (state) => {
	return {
		errorMessage: state.auth.errorMessage,
		successMessage: state.auth.successMessage,
		showLoading: state.auth.showLoading,
	};
};
export default connect(mapStateToProps)(Login);