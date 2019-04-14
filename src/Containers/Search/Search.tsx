import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as RepoActions from '../../Store/Repositories/RepoActions'
import * as RepoTypes from '../../Store/Repositories/RepoTypes'
import SearchResults from '../../Components/SearchResults/SearchResults';
import Loader from '../../Utils/Loader/Loader';
import styles from './Search.module.css';

type StateProps = {
    searchResults: RepoTypes.Repo[] | null,
    totalResults?: number,
    currentPage: number,
    isLastPage: boolean,
    loading: boolean,
    searchText?: string,
    error: string | null,
}

type DispatchProps = {
    repoSearch(searchText: string, page: number): void,
    setSearchText(searchText: string): void,
}

class Search extends Component<StateProps & DispatchProps & RouteComponentProps> {

    onSearchTextChangedHandler = (ev: React.FormEvent<HTMLInputElement>) => {
        this.props.setSearchText(ev.currentTarget.value);
    }

    componentDidMount() {
        // this.props.repoSearch(this.state.searchText as string)
    }

    onSubmitSearch = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        if (!this.props.searchText) { return; }
        this.props.repoSearch(this.props.searchText, 1)
    }

    RepoClickedHandler = (repoId: number) => {
        this.props.history.push(`/repo/${repoId}`)
    }

    nextPageClickedHandler = () => {
        if (!this.props.searchText) { return; }
        this.props.repoSearch(this.props.searchText, this.props.currentPage + 1)
    }

    prevPageClickedHandler = () => {
        if (!this.props.searchText) { return; }
        this.props.repoSearch(this.props.searchText, this.props.currentPage - 1)
    }

    render() {
        return (
            <React.Fragment>

                <div className={styles.SearchFormWrapper}>
                    <form className={styles.SearchForm} onSubmit={this.onSubmitSearch}>
                        <input className={styles.SearchInput} type="text" placeholder="Search for a repo" value={this.props.searchText} onChange={this.onSearchTextChangedHandler} />
                        <button className={styles.SearchButton} type="submit">Search</button>
                    </form>

                </div>

                <hr />

                {this.props.loading ? <Loader /> : null}

                {this.props.error

                    ? <h3 className={styles.Error}>ERROR: {this.props.error}</h3>

                    : this.props.searchResults ?
                        <SearchResults
                            results={this.props.searchResults}
                            repoClicked={this.RepoClickedHandler}
                            prevPage={this.prevPageClickedHandler}
                            nextPage={this.nextPageClickedHandler}
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
        repoSearch: (searchText: string, pageNumber: number) => dispatch(RepoActions.RepoSearch(searchText, pageNumber)),
        setSearchText: (searchText: string) => dispatch(RepoActions.SetRepoSearchText(searchText)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));