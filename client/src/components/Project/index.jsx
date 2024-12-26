import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const AllocateProject = () => {
    const [projectData, setProjectData] = useState({
        name: "",
        tasks: [],
        progress: 0,
        created_by: "",
    });

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [tasks, setTasks] = useState([]); // List of available tasks
    const [users, setUsers] = useState([]); // State to hold the list of registered users

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get("http://localhost:8086/api/tasks/alltasks"); // Update API endpoint
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:8086/api/users/list");
                setUsers(response.data);  
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleChange = ({ target }) => {
        setProjectData({ ...projectData, [target.name]: target.value });
    };

    const handleTaskSelect = (e) => {
        const selectedTask = e.target.value;
        if (!projectData.tasks.includes(selectedTask)) {
            setProjectData({
                ...projectData,
                tasks: [...projectData.tasks, selectedTask],
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8086/api/projects";
            const { data: res } = await axios.post(url, projectData);
            setSuccessMessage(res.message);
            alert(res.message);

            setProjectData({
                name: "",
                tasks: [],
                progress: 0,
                created_by: "",
            });

            setTimeout(() => {
                setSuccessMessage("");
            }, 4000);
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div className={styles.task_container}>
            <h1>Create Project and Attach Tasks</h1>
            <form className={styles.form_container} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Project Name"
                    name="name"
                    value={projectData.name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
                <select
                    name="created_by"
                    value={projectData.created_by}
                    onChange={handleChange}
                    required
                    className={styles.input}
                >
                    <option value="">Select Chef</option>
                    {users.map(user => (
                        <option key={user._id} value={user.email}>{user.firstName} {user.lastName} {'('+user.email+')'} </option>
                    ))}
                </select>

                <select
                    onChange={handleTaskSelect}
                    required
                    className={styles.input}
                >
                    <option value="">Select Task</option>
                    {tasks.map((task) => (
                        <option key={task._id} value={task.taskName}>
                            {task.taskName}
                        </option>
                    ))}
                </select>
                <ul>
                    {projectData.tasks.map((taskId) => (
                        <li key={taskId}>{taskId}</li> // Replace with task details if needed
                    ))}
                </ul>
                {error && <div className={styles.error_msg}>{error}</div>}
                <button type="submit" className={styles.green_btn}>
                    Create Project
                </button>
                {successMessage && <div className={styles.success_msg}>{successMessage}</div>}
            </form>
        </div>
    );
};

export default AllocateProject;
