import React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Search } from './Search'

import SearchForm from '../../Components/SearchForm/SearchForm'
import SearchResults from '../../Components/SearchResults/SearchResults';
import Loader from '../../Utils/Loader/Loader';
import styles from './Search.module.css';
import * as RepoTypes from '../../Store/Repositories/RepoTypes'

configure({ adapter: new Adapter() });

describe('<Search />', () => {

    let wrapper: ShallowWrapper;
    beforeEach(() => {

        let mock: any = jest.fn();
        wrapper = shallow(<Search
            searchText={mock}
            currentPage={mock}
            isLastPage={mock}
            loading={mock}
            setSearchText={mock}
            error={mock}
            searchResults={mock}
            repoSearch={mock}
            location={mock}
            history={mock}
            match={mock}
        />);
    });

    it('should render the search form', () => {
        expect(wrapper.find(SearchForm)).toHaveLength(1);
    });

    it('should render the loader when loading is true', () => {
        wrapper.setProps({ loading: true })
        expect(wrapper.find(Loader)).toHaveLength(1);
    });

    it('should hide the loader when loading is false', () => {
        wrapper.setProps({ loading: false });
        expect(wrapper.find(Loader)).toHaveLength(0);
    });

    it('should display error message when error prop is set', () => {

        const errorMessage = 'Test Error Message'
        wrapper.setProps({ error: errorMessage });

        const errorElement = wrapper.find(`h3.${styles.Error}`);

        expect(errorElement).toHaveLength(1);
        expect(errorElement.text()).toContain(errorMessage);

    });

    it('should display not display search results when error prop is set', () => {
        wrapper.setProps({ error: 'Test Error Message' });
        expect(wrapper.find(SearchResults)).toHaveLength(0);
    });

    it('should not display error when error prop is null', () => {
        wrapper.setProps({ error: null });
        const errorElement = wrapper.find(`h3.${styles.Error}`);
        expect(errorElement).toHaveLength(0);
    });

    it('should render search results when searchResults prop is set (and error prop is false)', () => {
        wrapper.setProps({ searchResults: [{ id: 123, name: 'repo name' } as RepoTypes.Repo], error: false });
        expect(wrapper.find(SearchResults)).toHaveLength(1);
    });

})