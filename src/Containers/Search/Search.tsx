import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as RepoActions from '../../Store/Repositories/RepoActions'
import * as RepoTypes from '../../Store/Repositories/RepoTypes'
import SearchResults from '../../Components/SearchResults/SearchResults';
import Loader from '../../Utils/Loader/Loader';
import SearchForm from '../../Components/SearchForm/SearchForm';
import styles from './Search.module.css';

interface StateProps {
    searchResults: RepoTypes.Repo[] | null,
    totalResults?: number,
    currentPage: number,
    isLastPage: boolean,
    loading: boolean,
    searchText: string,
    error: string | null,
}

interface DispatchProps {
    onRepoSearch(searchText: string, page: number): void,
    onSetSearchText(searchText: string): void,
}

export interface Props extends StateProps, DispatchProps, RouteComponentProps {};

export class Search extends Component<Props> {

    onSearchTextChangedHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onSetSearchText(ev.currentTarget.value);
    }

    onSubmitSearchHandler = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        if (!this.props.searchText) { return; }
        this.props.onRepoSearch(this.props.searchText, 1)
    }

    RepoClickedHandler = (repoId: number) => {
        this.props.history.push(`/repo/${repoId}`)
    }


    changePageHandler = (increment: number) => {
        if (!this.props.searchText) { return; }
        this.props.onRepoSearch(this.props.searchText, this.props.currentPage + increment)
    }

    render() {
        return (
            <React.Fragment>

                <SearchForm
                    searchText={this.props.searchText}
                    searchTextChanged={this.onSearchTextChangedHandler}
                    submitSearch={this.onSubmitSearchHandler} />

                <hr />

                {this.props.loading ? <Loader /> : null}

                {this.props.error

                    ? <h3 className={styles.Error}>ERROR: {this.props.error}</h3>

                    : this.props.searchResults ?
                        <SearchResults
                            results={this.props.searchResults}
                            repoClicked={this.RepoClickedHandler}
                            prevPage={() => this.changePageHandler(-1)}
                            nextPage={() => this.changePageHandler(1)}
                            currentPage={this.props.currentPage}
                            isLastPage={this.props.isLastPage}
                        />
                        : null}


            </React.Fragment>
        );

    }

}

const mapStateToProps = (state: RepoTypes.RepoState): StateProps => {
    return {
        searchResults: state.repos,
        totalResults: state.total,
        currentPage: state.currentPage,
        isLastPage: state.isLastPage,
        loading: state.loading,
        searchText: state.searchText,
        error: state.error,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        onRepoSearch: (searchText: string, pageNumber: number) => dispatch(RepoActions.RepoSearch(searchText, pageNumber)),
        onSetSearchText: (searchText: string) => dispatch(RepoActions.SetRepoSearchText(searchText)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));