import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";

function ProjectEditModal({ project, onUpdate, onClose }) {
    const [updatedName, setUpdatedName] = useState(project.projectName);
    const [updatedDescription, setUpdatedDescription] = useState(project.projectDescription);
    const [updatedManager, setUpdatedManager] = useState(project.projectManager);
    const [updatedStatus, setUpdatedStatus] = useState(project.status);
    const [updatedDeadline, setUpdatedDeadline] = useState(project.deadline);
    const [managers, setManagers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchManagers = async () => {
            try {
                const response = await axios.get("http://localhost:8086/api/users/managers");
                setManagers(response.data);
            } catch (error) {
                setError('Error fetching managers');
            }
        };

        fetchManagers();
    }, []);

    const handleUpdate = async () => {
        try {
            const updatedProject = {
                projectName: updatedName,
                projectDescription: updatedDescription,
                projectManager: updatedManager,
                status: updatedStatus,
                deadline: updatedDeadline,
            };

            // Send request to update project
            await axios.put(`http://localhost:8086/api/projects/update/${project._id}`, updatedProject);

            // Call onUpdate function to update the project in the parent component
            onUpdate(project._id, updatedProject);

            // Close the modal
            onClose();
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    return (
        <div className={styles.edit_project_container}>
            <h2>Edit Project</h2>
            <label>
                Project Name:
                <input
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                />
            </label>
            <label>
                Description:
                <textarea
                    value={updatedDescription}
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                ></textarea>
            </label>
            <label>
                Project Manager:
                <select className='dropdown'
                    value={updatedManager}
                    onChange={(e) => setUpdatedManager(e.target.value)}
                >
                    <option value="">Select Manager</option>
                    {managers.map(manager => (
                        <option key={manager._id} value={manager.email}>
                            {manager.firstName} {manager.lastName} ({manager.email})
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Status:
                <select className='dropdown'
                    value={updatedStatus}
                    onChange={(e) => setUpdatedStatus(e.target.value)}
                >
                    <option value="in progress">In Progress</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
            </label>
            <label>
                Deadline:
                <input
                    type="date"
                    value={updatedDeadline}
                    onChange={(e) => setUpdatedDeadline(e.target.value)}
                />
            </label>
            <button onClick={handleUpdate} className={styles.edit_buttons}>Update</button>
            <button onClick={onClose} className={styles.edit_buttonscancel}>Cancel</button>
            {error && <p>{error}</p>}
        </div>
    );
}

export default ProjectEditModal;
