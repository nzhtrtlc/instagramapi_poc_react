import React from 'react';
import PropTypes from 'prop-types';

class Heart extends React.Component {

    static propTypes = {
        liked: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.heartRef = React.createRef();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.liked)
            this.heartRef.current.classList.add('is_heart_animating');
    }

    onHeartClick = () => {
        this.heartRef.current.classList.remove('is_heart_animated');
        this.heartRef.current.classList.toggle('is_heart_animating');
    };

    onAnimationEnd = () => {
        this.heartRef.current.classList.add('is_heart_animated');
    };

    componentDidMount() {
        this.heartRef.current.addEventListener('click', this.onHeartClick);
        this.heartRef.current.addEventListener('animationend', this.onAnimationEnd);
    }

    render() {
        return (
            <div className="heart" ref={this.heartRef}/>
        );
    }

}

export default Heart;