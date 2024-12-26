import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
// import AllocateTask from "./components/Admin";
import AdminMain from "./components/adminMain";
import AdminProject from "./components/adminProject";


import AdminViewTask from "./components/adminViewTask";
import AdminViewProject from "./components/adminViewProjects";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/admin" exact element={<AdminMain />} />
			<Route path="/admin/add-project" exact element={<AdminProject />} />
			<Route path="/admin/view-tasks" exact element={<AdminViewTask />} />
			<Route path="/admin/view-projects" exact element={<AdminViewProject />} />
			<Route path="/" element={<Navigate replace to="/login" />} />

		</Routes>
	);
}

export default App;
