
export const REPO_SEARCH = "REPO_SEARCH"
export const REPO_SEARCH_SUCCESS = "REPO_SEARCH_SUCCESS"
export const REPO_SEARCH_ERROR = "REPO_SEARCH_ERROR"
export const SET_REPO_SEARCH_TEXT = "SET_REPO_SEARCH_TEXT"

export interface Repo  {

    id: number,
    name: string,
    repoURL: string,
    description: string,

    owner: {
        id: number,
        userName: string,
        avatarURL: string,
    }
}

export interface RepoState  {
    total?: number,
    repos: Repo[] | null,
    error: string | null,
    currentPage: number,
    isLastPage: boolean,
    loading: boolean,
    searchText: string
}

export interface RepoSearchAction  {
    type: typeof REPO_SEARCH,
    searchText: string,
    page: number
}

export interface RepoSearchSuccessAction  {
    type: typeof REPO_SEARCH_SUCCESS,
    searchResults: Repo[],
    totalResults: number,
    isLastPage: boolean,
}

export interface RepoSearchErrorAction  {
    type: typeof REPO_SEARCH_ERROR,
    errorMessage: string
}

export interface SetRepoSearchTextAction  {
    type: typeof SET_REPO_SEARCH_TEXT,
    searchText: string
}

export type RepoActionTypes = 
    RepoSearchAction |
    RepoSearchSuccessAction |
    RepoSearchErrorAction|
    SetRepoSearchTextAction;