import React from 'react'

import styles from "./styles.module.css";

function adminNav() {

  return (
    <>
      <nav className={styles.navbar}>
        <h1>Versa</h1>
        <div className={styles.div_a}>
                <a href='/admin'>Add</a>
                <a href='/admin/view'>View</a>
        </div>
				 
        <div>
          {/* <strong>{email}</strong> */}
          <button className={styles.logout_btn} >
            Log out
          </button>
        </div>
      </nav>

    </>
  )
}

export default adminNav
