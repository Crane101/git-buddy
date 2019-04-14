import React, { Component } from 'react';
import './App.css';
import Search from './Containers/Search/Search';
import RepoDetail from './Containers/RepoDetail/RepoDetail';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Search} />
            <Route path="/repo/:id" exact component={RepoDetail} />
            <Route render={() => <h3>Page not found</h3>} />
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
