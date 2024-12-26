import styles from "./styles.module.css"; 
// import AllocateTask from "../Admin";
import TasksList from "../task";
import { useEffect, useState } from "react";
import Versa from "../adminMain/Versa4.png"

const Main = () => {
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Retrieve email from local storage
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };
    
    return (
        <div className={styles.main_container}>
            {/* <nav className={styles.navbar}>
                <h1>Task Management System</h1>
				<div>
				<strong>{email}</strong>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Logout
                </button>
				</div>
            </nav> */}

            <div className={styles.nav_container}>
                <nav className={styles.navbar}>
                    <img src={Versa} alt="" className={styles.Versa_logo} /> 
                    {/* <h1>Versa </h1> */}
                    
                    <h3>My Tasks</h3>
                    <div> 
                    <button className={styles.logout_btn} onClick={handleLogout}  >
                        Log out
                    </button>
                    </div>
                </nav>
            </div>
            
            <TasksList email={email} />
			{/* <AllocateTask /> */}

        </div>
    );
};

export default Main;
