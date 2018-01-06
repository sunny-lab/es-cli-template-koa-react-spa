import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {bindActionCreators} from 'redux';

import Hello from '../components/Hello';
import * as helloAction from '../../../redux/actions/hello';

class HelloApp extends React.Component {
    componentDidMount() {
        this.props.helloActions.getHelloContent('Hello World');
    }

    render() {
        return (
            <Hello content={this.props.content}/>
        )
    }
}

function mapStateToProps(state) {
    return {
        content: _.get(state, ['helloRes', 'content'])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        helloActions: bindActionCreators(helloAction, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HelloApp);
