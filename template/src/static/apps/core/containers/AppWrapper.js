/**
 * APP导航框架
 */

import React from 'react';

export default class AppWrapper extends React.PureComponent {
    render() {
        return (
            <div className="app-wrapper">
                {this.props.children}
            </div>
        )
    }
}
