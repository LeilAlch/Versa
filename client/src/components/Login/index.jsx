import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8086/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			localStorage.setItem("email", data.email);
			if (res.redirectToAdmin) {
				// Redirect to /admin route
				window.location = "/admin";
			} else{
				
			window.location = "/";
			}
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<>
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Welcome To Versa</h1>
						<h2>Login to Your Account</h2>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}> Sing In As User</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<button type="button" className={styles.signup_btn}><Link to="/signup"> Sing Up </Link></button>
				</div>
			</div>
		</div>
		<a href="/admin"><button   className={styles.green_btn}>Go to Admin</button></a>
		</>
	);
};

export default Login;
