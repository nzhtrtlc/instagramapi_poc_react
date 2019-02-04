import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MediaGrid from './MediaGrid';
import { getUserInfo, getUserMedia } from 'redux/actions/userActions';
import { connect } from 'react-redux';
import Filter from './Filter';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import withStyles from '@material-ui/core/es/styles/withStyles';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class UserMedia extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func,
        userInfo: PropTypes.object,
        userMedia: PropTypes.array,
        filteredUserMedia: PropTypes.array,
        userMediaLoading: PropTypes.bool,
        userMediaLoaded: PropTypes.bool,
        classes: PropTypes.object
    };

    componentDidMount() {
        this.props.dispatch(getUserInfo());
        this.props.dispatch(getUserMedia());
    }

    render() {
        const { userInfo, userMedia, filteredUserMedia, classes } = this.props;
        return (
            <React.Fragment>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Avatar style={{ width: 120, height: 120 }} alt=""
                                src={userInfo.profile_picture}/>
                    </Paper>
                </Grid>
                <Grid item xs={4}/>
                <Grid item xs={4}>
                    <Typography style={{ color: '#fff', marginTop: 10 }} variant="h4" gutterBottom>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <a href={`https://instagram.com/${userInfo.username}`}
                               style={{ color: 'unset', textDecoration: 'none' }}
                               target="_blank"
                               rel="noopener noreferrer">@{userInfo.username}</a>
                            <span className="dot"/>
                            <span style={{
                                fontSize: 10,
                                color: '#efefe'
                            }}>{userInfo.full_name}</span>
                        </div>
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Filter/>
                </Grid>
                <Grid item lg='auto'>
                    <MediaGrid media={filteredUserMedia.length > 0 ? filteredUserMedia : userMedia}/>
                </Grid>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    userInfo: state.user.userInfo.data,
    userMedia: state.user.userMedia.data,
    filteredUserMedia: state.user.userMedia.filteredData,
    userMediaLoading: state.user.userMedia.loading,
    userMediaLoaded: state.user.userMedia.loaded,
});

export default connect(mapStateToProps)(withStyles(styles)(UserMedia));