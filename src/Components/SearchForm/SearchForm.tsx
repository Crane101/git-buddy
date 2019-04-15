import React from 'react';
import styles from './SearchForm.module.css';

type Props = {
    submitSearch(ev: React.FormEvent<HTMLFormElement>): void
    searchText: string,
    searchTextChanged(ev: React.ChangeEvent<HTMLInputElement>): void
}

const searchForm = (props: Props) => (

    <div className={styles.SearchFormWrapper}>
        <form className={styles.SearchForm} onSubmit={props.submitSearch}>
            <input className={styles.SearchInput} type="text" placeholder="Search for a repo" value={props.searchText} onChange={props.searchTextChanged} />
            <button className={styles.SearchButton} type="submit">Search</button>
        </form>

    </div>

);

export default searchForm;