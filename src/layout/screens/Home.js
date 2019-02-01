import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <button onClick={() => this.props.dispatch({type: 'TEST'})}>Dispatch</button>
            </div>
        );
    }

}

export default connect()(Home);