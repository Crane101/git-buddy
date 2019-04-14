import React, { useRef, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import MarkDown from '../../Utils/Markdown/Markdown'
import useFetchRepo from './UseFetchRepo/UseFetchRepo'
import Loader from '../../Utils/Loader/Loader';
import styles from './RepoDetail.module.css';

interface RouteProps extends RouteComponentProps<{ id: string }> { }

const repoDetail = (props: RouteProps) => {

    const [repo, getRepo] = useFetchRepo();
    useEffect(() => getRepo(parseInt(props.match.params.id)), []);

    const cloneRef = useRef<HTMLInputElement>(null);

    const readme = repo && repo.details && repo.readme ?
        <MarkDown
            content={repo!.readme}
            baseUrl={`https://raw.githubusercontent.com/${repo.details.owner.userName}/${repo.details.name}/${repo.details.defaultBranch}/`}
        />

        : null

    const cloneUrlClickedHandler = (ev: React.MouseEvent<HTMLInputElement>) => {

        if (cloneRef.current != null) {
            cloneRef.current.select();
            document.execCommand('copy');
            window.getSelection()!.removeAllRanges();
        }
    }

    const backButtonClickedHandler = () => props.history.goBack();

    return (

        repo && repo.details ?

            <React.Fragment>
                <h1 className={styles.RepoTitle}>{repo.details.name}</h1>

                <button className={styles.BackButton} onClick={backButtonClickedHandler}>🡄 Back to Search</button>

                <div className={styles.InfoPanel}>
                    <img className={styles.Avatar} src={repo.details.owner.avatarURL} />

                    <p>{repo.details.description}</p>

                    <p>by {repo.details.owner.userName}</p>

                    <p>Open Issues: {repo.details.openIssuesCount}</p>
                    <p>Forks: {repo.details.forkCount}</p>
                    {/* <p>etc: {repo.etc}</p> */}

                    <p>
                        <span>Clone URL: </span>
                        <input onClick={cloneUrlClickedHandler} className={styles.CloneInput} readOnly={true} type="text" value={repo.details.cloneUrl} ref={cloneRef} />
                        <span> (click to copy)</span>
                    </p>

                    <p><a href={repo.details.repoURL} target="_blank">View on Github</a></p>

                </div>

                <div className={styles.Readme}>

                    <h3>Readme: </h3>
                    <hr />
                    {readme}

                </div>
            </React.Fragment >

            : <Loader />

    )
}

export default repoDetail;