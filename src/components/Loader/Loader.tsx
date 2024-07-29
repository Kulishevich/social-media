import React from 'react'
import styles from './Loader.module.scss'

const Loader = () => {
  return (
    <div className={styles.container}>
        <div className={styles.loader1}>
            <div className={styles.loader2}>
                <div className={styles.loader3}>
                    <div className={styles.loader4}>
                        <div className={styles.loader5}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Loader