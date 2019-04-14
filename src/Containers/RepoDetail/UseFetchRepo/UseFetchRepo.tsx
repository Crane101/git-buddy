import { useReducer } from 'react';
import Axios from 'axios';
import UseFetchRepoReducer, { SET_REPO_DETAIL, SET_README, RepoDetailState, RepoData } from './UseFetchRepoReducer';

const useRepoDetail = (): [RepoDetailState | undefined, (id: number) => void] => {

    const [repo, dispatch] = useReducer(UseFetchRepoReducer, {} as RepoDetailState);

    const fetchRepo = (repoId: number) => {

        Axios.get(`https://api.github.com/repositories/${repoId}`)
            .then(resp => {

                const repo: RepoData = {
                    id: 123,
                    name: resp.data.name,
                    openIssuesCount: resp.data.open_issues,
                    forkCount: resp.data.forks,
                    owner: {
                        id: resp.data.owner.id,
                        userName: resp.data.owner.login,
                        avatarURL: resp.data.owner.avatar_url,
                    },
                    defaultBranch: resp.data.default_branch,
                    description: resp.data.description,
                    repoURL: resp.data.html_url,
                    cloneUrl: resp.data.clone_url,
                };

                dispatch({ type: SET_REPO_DETAIL, repoData: repo })

            })
            .catch(err => {
                console.log(err);
            });

        Axios.get(`https://api.github.com/repositories/${repoId}/readme`)
            .then(resp => {
                dispatch({ type: SET_README, readme: atob(resp.data.content) })
            })
            .catch(err => {
                dispatch({ type: SET_README, readme: "No readme found" })
            });
    }
    return [repo, fetchRepo];
}

export default useRepoDetail;