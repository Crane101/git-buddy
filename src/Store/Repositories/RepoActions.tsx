import * as RepoTypes from './RepoTypes'

export const RepoSearch = (searchText: string, page: number): RepoTypes.RepoSearchAction => {
    return {
        type: RepoTypes.REPO_SEARCH,
        searchText: searchText,
        page: page,
    }
}

export const RepoSearchSuccess = (searchResults: RepoTypes.Repo[], totalResults: number, isLastPage: boolean): RepoTypes.RepoSearchSuccessAction => {
    return {
        type: RepoTypes.REPO_SEARCH_SUCCESS,
        searchResults: searchResults,
        totalResults: totalResults,
        isLastPage: isLastPage,
    }
}

export const RepoSearchError = (errorMessage: string): RepoTypes.RepoSearchErrorAction => {
    return {
        type: RepoTypes.REPO_SEARCH_ERROR,
        errorMessage: errorMessage,
    }
}

export const SetRepoSearchText = (searchText: string): RepoTypes.SetRepoSearchTextAction => {
    return {
        type: RepoTypes.SET_REPO_SEARCH_TEXT,
        searchText: searchText,
    }
}