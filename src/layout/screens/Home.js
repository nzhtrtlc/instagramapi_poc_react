import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import ImageGrid from './ImageGrid';

import Grow from '@material-ui/core/Grow';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import 'main.css';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});


class Home extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func
    };

    state = {
        accessToken: null,
        userLogged: false
    };

    componentDidMount() {
        this.checkUserLogin();
        this.checkAccessTokenUrl();
    }

    checkUserLogin = () => {
        const storedAccessToken = localStorage.getItem('instagram_access_token');
        const userLogged = storedAccessToken !== null;
        this.setState({ userLogged, accessToken: storedAccessToken })
    };

    checkAccessTokenUrl() {
        if (document.location.hash.startsWith('#access_token')) {
            const accessToken = document.location.hash.split('#')[1].split('=')[1];
            localStorage.setItem('instagram_access_token', accessToken);
            this.setState({ accessToken });
        }
    }

    login = () => {
        const clientId = '5275b13c961144bfaad9569fb880c252';
        const redirectUri = 'http://localhost:3000/callback/instagram';
        window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`;
    };

    getUserInfo = () => {
        //axios.get(`https://api.instagram.com/v1/users/self/?access_token=${this.state.accessToken}`)
        //.then(res => console.log(res.data));
        axios.get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${this.state.accessToken}`)
            .then(res => console.log(res));
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container>
                    <Grid container
                          spacing={0}
                          direction="column"
                          alignItems="center"
                          justify="center"
                          style={{ minHeight: '100vh' }}>
                        <Grow in>
                            <Avatar style={{ width: 120, height: 120 }} alt="Remy Sharp"
                                    src="https://material-ui.com/static/images/avatar/1.jpg"/>
                        </Grow>
                        <Grow in>
                            <Typography style={{ color: '#fff', marginTop: 10 }} variant="h4" gutterBottom>
                                <a href="https://instagram.com/nzh.t" style={{ color: 'unset', textDecoration: 'none' }}
                                   target="_blank">@nzh.t</a>
                            </Typography>
                        </Grow>
                        <ImageGrid/>
                    </Grid>
                </Grid>
            </div>
        );
    }

}

export default connect()(Home);