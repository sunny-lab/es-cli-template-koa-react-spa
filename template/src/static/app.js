"use strict";

import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import {Router, hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import 'whatwg-fetch';

import AppWrapper from './apps/core/containers/AppWrapper';
import configureStore from './redux/store/configureStore';

import HelloRouter from './apps/hello';

let routers = [HelloRouter];

const initialState = window.__INITIAL_STATE__ || {};

const core = {
    path: '/hello',
    component: AppWrapper,
    childRoutes: routers
};

let appStore = configureStore(initialState);
const App = (
    <Provider store={appStore}>
        <Router routes={core} history={hashHistory}/>
    </Provider>
);

ReactDom.render(App, document.getElementById('mainApp'));
