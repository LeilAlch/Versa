import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";
import TaskEditModal from '../taskEdit';
import Versa from "../adminMain/Versa3.png"

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Add icons to the library
library.add(faEdit, faTrash);

function AdminViewTask() {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [error, setError] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const handleLogout = () => { 
        window.location = "/";
    };
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get("http://localhost:8086/api/tasks/alltasks");
                setTasks(response.data);
            } catch (error) {
                setError(error.response.data.message);
            }
        };

        fetchTasks();
    }, []);

    useEffect(() => {
        // Apply sorting
        const sortedTasks = tasks.sort((a, b) => {
            const sortOrderValue = sortOrder === 'asc' ? 1 : -1;
            return sortOrderValue * (a[sortBy] > b[sortBy] ? 1 : -1);
        });

        // Apply search filtering
        const filtered = sortedTasks.filter(task => {
            return task.taskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.allocatedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.status.toLowerCase().includes(searchTerm.toLowerCase());
        });

        setFilteredTasks(filtered);
    }, [tasks, sortBy, sortOrder, searchTerm]);

    const handleUpdate = async (taskId, updatedTask) => {
        try {
            await axios.put(`http://localhost:8086/api/tasks/${taskId}`, updatedTask);
            // Update the task in the local state
            const updatedTasks = tasks.map(task => {
                if (task._id === taskId) {
                    return { ...task, ...updatedTask };
                }
                return task;
            });
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`http://localhost:8086/api/tasks/${taskId}`);
            // Remove the deleted task from the local state
            const filteredTasks = tasks.filter(task => task._id !== taskId);
            setTasks(filteredTasks);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleOpenEditModal = (task) => {
        setEditingTask(task);
    };

    const handleCloseEditModal = () => {
        setEditingTask(null);
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

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'green';
            case 'in progress':
                return 'orange';
            case 'pending':
                return 'red';
            default:
                return 'black'; // Default color
        }
    };

    return (
        <>
        
        
             <div className={styles.nav_container}>
                <nav className={styles.navbar}>
                    <img src={Versa} alt="" className={styles.Versa_logo} /> 
                    {/* <h1>Versa </h1> */}
                    <div className={styles.div_a}>
                        <a href='/admin'>Add Task </a>
                        <a href='/admin/view'>View Tasks</a>
                    </div>
                    
                    <div> 
                    <button className={styles.logout_btn} onClick={handleLogout}  >
                        Log out
                    </button>
                    </div>
                </nav>
            </div>

             <div className={styles.tasks_container}>
            <h1>All Tasks</h1>
            {error && <p>{error}</p>}
            
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Allocated To</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Validity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map(task => (
                        <tr key={task._id}>
                            <td>{task.taskName}</td>
                            <td>{task.allocatedTo}</td>
                            <td>
                                <span style={{ color: getStatusColor(task.status) }}>&#11044; </span>
                                {task.status}
                            </td>
                            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
                            <td>{new Date(task.validity).toLocaleDateString()}</td>
                            <td className={styles.tableActions}>
                            <button className={styles.editButton} onClick={() => handleOpenEditModal(task)}><FontAwesomeIcon icon="edit" /></button>
                            <button className={styles.deleteButton} onClick={() => handleDelete(task._id)}><FontAwesomeIcon icon="trash" /></button>
</td>

                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={styles.filters}>
                <input
                    type="text"
                    placeholder="Search tasks"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <label>
                    Sort by:
                    <select value={sortBy} onChange={handleSortChange}>
                        <option value="createdAt">Created At</option>
                        <option value="taskName">Task Name</option>
                        <option value="allocatedTo">Allocated To</option>
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
            
            {editingTask && (
                <div className={styles.modalBackdrop}>
                    <div className={styles.modal}>
                        <TaskEditModal
                            task={editingTask}
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

export default AdminViewTask;
