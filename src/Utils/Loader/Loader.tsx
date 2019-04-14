import React from 'react';
import LoaderImg from '../../Assets/Images/loader.gif';
import styles from './Loader.module.css';

const loader = () => (
    <React.Fragment>
        <div className={styles.ImageWrapper}>
            <img src={LoaderImg} />
        </div>
        <div className={styles.Backdrop} />
    </React.Fragment>
)

export default loader;