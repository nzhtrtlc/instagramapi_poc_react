import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import MediaGrid from './MediaGrid';
import { getUserInfo, getUserMedia } from 'redux/actions/userActions';
import { connect } from 'react-redux';
import Filter from './Filter';

class UserMedia extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func,
        userInfo: PropTypes.object,
        userMedia: PropTypes.array,
        filteredUserMedia: PropTypes.array,
        userMediaLoading: PropTypes.bool,
        userMediaLoaded: PropTypes.bool
    };

    componentDidMount() {
        this.props.dispatch(getUserInfo());
        this.props.dispatch(getUserMedia());
    }

    render() {
        const { userInfo, userMedia, userMediaLoaded, filteredUserMedia } = this.props;
        return (
            <React.Fragment>
                <Avatar style={{ width: 120, height: 120 }} alt=""
                        src={userInfo.profile_picture}/>
                <Grow in>
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
                </Grow>
                {userMediaLoaded && <React.Fragment>
                    <Filter/>
                    <MediaGrid media={filteredUserMedia.length > 0 ? filteredUserMedia : userMedia}/>
                </React.Fragment>}
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

export default connect(mapStateToProps)(UserMedia);