import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { saveToken } from 'redux/actions/userActions';
import UserMedia from './UserMedia';
import 'main.css';

class Home extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func,
        userLogged: PropTypes.bool
    };

    componentDidMount() {
        this.checkUserAccess();
    }

    checkUserAccess() {
        if (document.location.hash.startsWith('#access_token')) {
            const accessToken = document.location.hash.split('#')[1].split('=')[1];
            this.props.dispatch(saveToken(accessToken));
        } else {
            const storedAccessToken = localStorage.getItem('insta_token');
            const isTokenStored = storedAccessToken !== null;
            if (isTokenStored)
                this.props.dispatch(saveToken(storedAccessToken));
        }
    }

    login = () => {
        const clientId = '5275b13c961144bfaad9569fb880c252';
        const redirectUri = window.location.href;
        window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`;
    };

    render() {
        const { userLogged } = this.props;
        return (
            <Grid container spacing={16}
                  direction="column"
                  alignItems="center"
                  justify="center">
                {!userLogged &&
                <Button style={{ margin: '15% auto' }} onClick={this.login} color="default" variant="contained"
                        size="small">Log in via
                    instagram</Button>}
                {userLogged && <UserMedia/>}
            </Grid>
        );
    }

}

const mapStateToProps = state => ({
    userLogged: state.user.userLogged
});

export default connect(mapStateToProps)(Home);