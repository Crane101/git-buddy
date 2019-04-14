import * as RepoTypes from './RepoTypes';

const initialState: RepoTypes.RepoState = {

    total: undefined,
    currentPage: 1,
    isLastPage: false,
    repos: null,
    error: null,
    loading: false,
    searchText: ''

}

const RepoReducer = (state = initialState, action: RepoTypes.RepoActionTypes): RepoTypes.RepoState => {

    switch (action.type) {

        case RepoTypes.REPO_SEARCH:
            return ({ ...state, currentPage: action.page, loading: true,  error: null })

        case RepoTypes.REPO_SEARCH_SUCCESS:
            return ({ ...state, repos: action.searchResults, isLastPage: action.isLastPage, loading: false, error: null })

        case RepoTypes.REPO_SEARCH_ERROR:
            return ({ ...state, error: action.errorMessage, loading: false })

        case RepoTypes.SET_REPO_SEARCH_TEXT:
            return ({ ...state, searchText: action.searchText })

        default: return state;

    }

}

export default RepoReducer;