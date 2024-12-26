import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";
import ProjectEditModal from '../ProjectEdit'; // Assuming a modal for editing projects
import Versa from "../adminMain/Versa4.png";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Add icons to the library
library.add(faEdit, faTrash);

function AdminViewProject() {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [error, setError] = useState('');
    const [editingProject, setEditingProject] = useState(null);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');

    const handleLogout = () => { 
        window.location = "/";
    };

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("http://localhost:8086/api/projects/allprojects");
                setProjects(response.data);
            } catch (error) {
                setError(error.response?.data?.message || "An error occurred while fetching projects.");
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        // Apply sorting
        const sortedProjects = projects.sort((a, b) => {
            const sortOrderValue = sortOrder === 'asc' ? 1 : -1;
            return sortOrderValue * (a[sortBy] > b[sortBy] ? 1 : -1);
        });

        // Apply search filtering
        const filtered = sortedProjects.filter(project => {
            return project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.created_by.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.progress.toLowerCase().includes(searchTerm.toLowerCase());
        });

        setFilteredProjects(filtered);
    }, [projects, sortBy, sortOrder, searchTerm]);

    const handleUpdate = async (projectId, updatedProject) => {
        try {
            await axios.put(`http://localhost:8086/api/projects/${projectId}`, updatedProject);
            // Update the project in the local state
            const updatedProjects = projects.map(project => {
                if (project._id === projectId) {
                    return { ...project, ...updatedProject };
                }
                return project;
            });
            setProjects(updatedProjects);
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    const handleDelete = async (projectId) => {
        try {
            await axios.delete(`http://localhost:8086/api/projects/${projectId}`);
            // Remove the deleted project from the local state
            const filteredProjects = projects.filter(project => project._id !== projectId);
            setProjects(filteredProjects);
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    const handleOpenEditModal = (project) => {
        setEditingProject(project);
    };

    const handleCloseEditModal = () => {
        setEditingProject(null);
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleOrderChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const getStatusColor = (progress) => {
        if (progress < 40) {
            return 'red';
        } else if (progress >= 40 && progress < 70) {
            return 'orange';
        } else if (progress >= 70) {
            return 'green';
        } else {
            return 'black';
        }
    };
    

    return (
        <>
            <div className={styles.nav_container}>
                <nav className={styles.navbar}>
                    <img src={Versa} alt="" className={styles.Versa_logo} />
                    <div className={styles.div_a}>
                        <a href='/admin'>Add Task</a>
                        <a href='/admin/add-project'>Add Project</a>
                        <a href='/admin/view-projects'>View Projects</a>
                        <a href='/admin/view-tasks'>View Tasks</a>

                    </div>
                    <div>
                        <button className={styles.logout_btn} onClick={handleLogout}>
                            Log out
                        </button>
                    </div>
                </nav>
            </div>

            <div className={styles.tasks_container}>
                <h1>All Projects</h1>
                {error && <p>{error}</p>}
                
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Manager</th>
                            <th>Progress</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProjects.map(project => (
                            <tr key={project._id}>
                                <td>{project.name}</td>
                                <td>{project.created_by}</td>
                                <td>
                                    <span style={{ color: getStatusColor(project.progress) }}>&#11044; </span>
                                    {project.progress}
                                </td>
                                <td>{new Date(project.createdAt).toLocaleDateString()}</td>
                                {/* <td>{new Date(project.deadline).toLocaleDateString()}</td> */}
                                <td className={styles.tableActions}>
                                    <button
                                        className={styles.editButton}
                                        onClick={() => handleOpenEditModal(project)}
                                    >
                                        <FontAwesomeIcon icon="edit" />
                                    </button>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => handleDelete(project._id)}
                                    >
                                        <FontAwesomeIcon icon="trash" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className={styles.filters}>
                    <input
                        type="text"
                        placeholder="Search projects"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <label>
                        Sort by:
                        <select value={sortBy} onChange={handleSortChange}>
                            <option value="createdAt">Created At</option>
                            <option value="name">Project Name</option>
                            <option value="manager">Manager</option>
                            <option value="status">Status</option>
                        </select>
                    </label>
                    <label>
                        Order:
                        <select value={sortOrder} onChange={handleOrderChange}>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </label>
                </div>
                
                {editingProject && (
                    <div className={styles.modalBackdrop}>
                        <div className={styles.modal}>
                            <ProjectEditModal
                                project={editingProject}
                                onUpdate={handleUpdate}
                                onClose={handleCloseEditModal}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default AdminViewProject;
