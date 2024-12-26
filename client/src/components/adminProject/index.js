import React from 'react';
import styles from "./styles.module.css";
// import AllocateTask from "../Admin"; 
import Versa from "../adminMain/Versa4.png"
import AllocateProject from '../Project';

function AdminProject() {
    const handleLogout = () => { 
        window.location = "/";
    };
    
    return (
        <div className={styles.main}>
            <div className={styles.nav_container}>
                <nav className={styles.navbar}>
                    <img src={Versa} alt="" className={styles.Versa_logo} /> 
                    {/* <h1>Versa </h1> */}
                    <div className={styles.div_a}>
                        <a href='/admin'>Add Task </a>
                        <a href='/admin/add-project'>Add Project </a>
                        <a href='/admin/view-tasks'>View Tasks</a>
                        <a href='/admin/view-projects'>View Projects</a>

                    </div>
                    
                    <div> 
                    <button className={styles.logout_btn} onClick={handleLogout}  >
                        Log out
                    </button>
                    </div>
                </nav>
            </div>
            
             
			
            <AllocateProject />
 

        </div>
    );
};

export default AdminProject;
