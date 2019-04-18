import React from "react";
import { configure, shallow, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Search, Props } from "./Search";
import { History } from "history";

import SearchForm from "../../Components/SearchForm/SearchForm";
import SearchResults from "../../Components/SearchResults/SearchResults";
import Loader from "../../Utils/Loader/Loader";
import styles from "./Search.module.css";
import * as RepoTypes from "../../Store/Repositories/RepoTypes";

configure({ adapter: new Adapter() });

describe("<Search />", () => {

    const mock: any = jest.fn();
    const mockSearchResults: RepoTypes.Repo[] = [{ id: 123, name: "repo name" } as RepoTypes.Repo];
    const testSearchString = "some text";
    const testErrorMessage = "Test Error Message"

    let wrapper: ShallowWrapper;
    beforeEach(() => {
        wrapper = shallow(
            <Search
                searchText={mock}
                currentPage={mock}
                isLastPage={mock}
                loading={mock}
                onSetSearchText={mock}
                error={mock}
                searchResults={mock}
                onRepoSearch={mock}
                location={mock}
                history={mock}
                match={mock}
            />
        );
    });

    it("should render the search form", () => {
        expect(wrapper.find(SearchForm)).toHaveLength(1);
    });

    it("should render the loader when loading is true", () => {
        wrapper.setProps({ loading: true } as Props);
        expect(wrapper.find(Loader)).toHaveLength(1);
    });

    it("should hide the loader when loading is false", () => {
        wrapper.setProps({ loading: false } as Props);
        expect(wrapper.find(Loader)).toHaveLength(0);
    });

    it("should display error message when error prop is set", () => {
        wrapper.setProps({ error: testErrorMessage } as Props);
        const errorElement = wrapper.find(`h3.${styles.Error}`);
        expect(errorElement).toHaveLength(1);
        expect(errorElement.text()).toContain(testErrorMessage);
    });

    it("should not display search results when error prop is set", () => {
        wrapper.setProps({ error: testErrorMessage } as Props);
        expect(wrapper.find(SearchResults)).toHaveLength(0);
    });

    it("should not display error when error prop is null", () => {
        wrapper.setProps({ error: null } as Props);
        const errorElement = wrapper.find(`h3.${styles.Error}`);
        expect(errorElement).toHaveLength(0);
    });

    it("should render search results when searchResults prop is set (and error is null)", () => {

        const props: Props = {
            ...({} as Props),
            searchResults: mockSearchResults,
            error: null
        };

        wrapper.setProps(props);
        expect(wrapper.find(SearchResults)).toHaveLength(1);

    });

    it("should dispatch SetSearchText on change of search text", () => {
        const setSearchTextFn = jest.fn();
        const props: Props = { ...({} as Props), onSetSearchText: setSearchTextFn };
        wrapper.setProps(props);
        const event = { currentTarget: { value: testSearchString } } as React.ChangeEvent<HTMLInputElement>;

        wrapper.find(SearchForm).props().searchTextChanged(event);
        expect(setSearchTextFn).toHaveBeenCalledWith(testSearchString);
    });

    it("should dispatch repoSearch on click of search button", () => {
        const repoSearchFn = jest.fn();
        const props: Props = {
            ...({} as Props),
            onRepoSearch: repoSearchFn,
            searchText: testSearchString
        };
        wrapper.setProps(props);
        const event = { preventDefault: mock } as React.FormEvent<HTMLFormElement>;

        wrapper.find(SearchForm).props().submitSearch(event);
        expect(repoSearchFn).toHaveBeenCalledWith(testSearchString, 1);
    });

    it("should suppress default form submission on click of search button", () => {
        const preventDefaultFn: any = jest.fn();
        const event = { preventDefault: preventDefaultFn } as React.FormEvent<HTMLFormElement>;
        wrapper.find(SearchForm).props().submitSearch(event);
        expect(preventDefaultFn).toHaveBeenCalledTimes(1);
    });

    it("should not dispatch repo search if search text is empty", () => {

        const repoSearchFn = jest.fn();

        const props: Props = {
            ...({} as Props),
            onRepoSearch: repoSearchFn,
            searchText: ""
        };
        wrapper.setProps(props);
        const event = { preventDefault: mock } as React.FormEvent<HTMLFormElement>;

        wrapper.find(SearchForm).props().submitSearch(event);
        expect(repoSearchFn).toBeCalledTimes(0);
    });

    it("should push repo url to history on click of repo result", () => {

        const historyMock: History<any> = {
            length: mock,
            action: mock,
            location: mock,
            push: mock,
            replace: mock,
            go: mock,
            goBack: mock,
            goForward: mock,
            block: mock,
            createHref: mock,
            listen: mock
        };

        const historyPushFn = jest.fn();
        historyMock.push = historyPushFn;

        const props: Props = {
            ...({} as Props),
            searchResults: mockSearchResults,
            error: null,
            history: historyMock
        };

        wrapper.setProps(props);

        const repoId = 10;
        wrapper.find(SearchResults).props().repoClicked(repoId);
        expect(historyPushFn).toHaveBeenCalledWith(`/repo/${repoId}`);
        
    });

    it("should dispatch repoSearch with incremented current page on click of pagination control", () => {

        const repoSearchFn = jest.fn();

        const props: Props = {
            ...({} as Props),
            onRepoSearch: repoSearchFn,
            searchText: testSearchString,
            searchResults: mockSearchResults,
            error: null,
            currentPage: 3
        };

        wrapper.setProps(props);

        wrapper.find(SearchResults).props().nextPage();
        expect(repoSearchFn).toHaveBeenCalledWith(testSearchString, 4);

    });
});
