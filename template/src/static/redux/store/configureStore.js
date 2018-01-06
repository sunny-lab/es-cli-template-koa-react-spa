import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import _ from 'lodash';

import reducers from '../reducers';
import ActionType from '../constants/ActionType';

const middlewares = [thunk];

export default function configureCinderStore(preloadedState) {
    const store = createStore(
        reducers,
        preloadedState,
        applyMiddleware(...middlewares)
    );
    return store;
}

