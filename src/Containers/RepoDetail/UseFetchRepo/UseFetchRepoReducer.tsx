
import { Repo } from '../../../Store/Repositories/RepoTypes';
export const SET_REPO_DETAIL = "SET_REPO_DETAIL";
export const SET_README = "SET_README";

export interface RepoDetailState  {
    details: RepoData,
    readme: string,
}

export interface RepoData  extends Repo  {
    openIssuesCount: number,
    forkCount: number,
    defaultBranch: string,
    cloneUrl: string,
}

interface SetRepoDetailAction  {
    type: typeof SET_REPO_DETAIL,
    repoData: RepoData
}

interface SetReadmeAction  {
    type: typeof SET_README,
    readme: string,
}

type FetchRepoAction = SetRepoDetailAction | SetReadmeAction;

const UseFetchRepoReducer = (state: RepoDetailState, action: FetchRepoAction): RepoDetailState => {

    switch (action.type) {
        case SET_REPO_DETAIL: return { ...state, details: action.repoData };
        case SET_README: return { ...state, readme: action.readme };
        default: return state;
    }
}

export default UseFetchRepoReducer;