import Axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import * as RepoTypes from './RepoTypes';
import * as RepoActions from './RepoActions'

export function* RepoSearch(action: RepoTypes.RepoSearchAction) {

    try {

        const response = yield Axios.get(`https://api.github.com/search/repositories`,
            {
                params: {
                    q: action.searchText,
                    page: action.page,
                }
            }
        );

        if (response.data.items.length) {

            const lastPage = !response.headers.link || response.headers.link.indexOf("rel=\"next\"") === -1;

            const searchResults: RepoTypes.Repo[] = response.data.items.map((i: any): RepoTypes.Repo => ({

                id: i.id,
                name: i.name,
                repoURL: i.html_url,
                description: i.description,
                owner: {
                    id: i.owner.id,
                    userName: i.owner.login,
                    avatarURL: i.owner.avatar_url,

                }
            }
            ));

            yield put(RepoActions.RepoSearchSuccess(searchResults, response.data.total_count as number, lastPage));

        } else {

            yield put(RepoActions.RepoSearchError("No Repositories Found!"))

        }

    } catch (error) {

        yield put(RepoActions.RepoSearchError(error.message))

    }

}

export default function* RepoSaga() {
    yield takeLatest(RepoTypes.REPO_SEARCH, RepoSearch);
}
