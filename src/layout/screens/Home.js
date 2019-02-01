import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Home extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func
    };

    testDispatch = () => {
        this.props.dispatch({ type: 'TEST' });
    };

    render() {
        return (
            <div>
                <button onClick={this.testDispatch}>Dispatch</button>
            </div>
        );
    }

}

export default connect()(Home);