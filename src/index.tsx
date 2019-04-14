import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import RepoReducer from './Store/Repositories/RepoReducer';
import RepoSaga from './Store/Repositories/RepoSaga';

const composeEnhancers = process.env.NODE_ENV === 'development'
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const sagaMiddleware = createSagaMiddleware()

const store = createStore(RepoReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(RepoSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
