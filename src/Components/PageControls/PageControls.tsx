import React from 'react';
import styles from './PageControls.module.css'

type Props = {
    currentPage: number,
    isLastPage: boolean,
    nextPage(): void,
    prevPage(): void,
}

const pageControls = (props: Props) => (

    <div className={styles.PageControls}>

        <button onClick={props.prevPage} disabled={props.currentPage === 1}>🡄 Previous Page</button>

        <p>Page {props.currentPage}</p>

        <button onClick={props.nextPage} disabled={props.isLastPage} >Next Page 🡆</button>

    </div>

);

export default pageControls;