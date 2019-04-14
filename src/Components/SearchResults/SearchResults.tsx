import React from 'react';
import { Repo } from '../../Store/Repositories/RepoTypes';
import PageControls from '../PageControls/PageControls';
import styles from './SearchResults.module.css';

type Props = {

    results: Repo[],
    repoClicked(repoId: number): void,
    nextPage(): void,
    prevPage(): void,
    currentPage: number,
    isLastPage: boolean,

}

const searchResults = (props: Props) => {

    const pageControls = <PageControls
        currentPage={props.currentPage}
        nextPage={props.nextPage}
        prevPage={props.prevPage}
        isLastPage={props.isLastPage}
    />

    return (

        <React.Fragment>

            {pageControls}

            <table className={styles.ResultsTable}>

                <thead>
                    <tr>
                        <th>Repo Name</th>
                        <th>Author</th>
                        <th>Description</th>
                    </tr>
                </thead>

                <tbody>
                    {props.results.map(i => (

                        <tr key={i.id} onClick={() => props.repoClicked(i.id)}>

                            <td>{i.name}</td>
                            <td>
                                <img className={styles.Avatar} src={i.owner.avatarURL} />
                                {i.owner.userName}
                            </td>
                            <td>{i.description}</td>

                        </tr>

                    ))}

                </tbody>
            </table>

            {pageControls}

        </React.Fragment>
    );
}

export default searchResults;

