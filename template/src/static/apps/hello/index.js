import React from 'react';

export default {
    path: '/hello',
    getComponents(nextState, callback) {
        require.ensure([], function (require) {
            callback(null, require('./containers/HelloApp'))
        })
    }
};
