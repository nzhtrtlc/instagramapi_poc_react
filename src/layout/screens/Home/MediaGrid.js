import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import VideoIcon from '@material-ui/icons/Videocam';
import ImageIcon from '@material-ui/icons/Image';
import Grow from '@material-ui/core/Grow';
import HeartIcon from 'layout/components/Heart';
import { likeMedia } from 'redux/actions/userActions';
import { connect } from 'react-redux';

const styles = () => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden'
    },
    gridList: {
        width: '75%',
        maxHeight: 400
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'white',
    },
});

class MediaGrid extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func
    };

    onMediaLike(id, liked = false) {
        this.props.dispatch(likeMedia(id, !liked));
    }

    render() {
        const { classes, media } = this.props;
        return (
            <div className={classes.root}>
                <GridList className={classes.gridList} cols={4}>
                    {media.map((item, index) => {
                        const liked = item.isUserLiked;
                        const Title = (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-end'
                            }}>
                            <span>
                                {item.type === 'video' ? <VideoIcon/> : <ImageIcon/>}
                            </span>
                            </div>
                        );
                        return (
                            <Grow
                                key={item.id}
                                in={true}
                                style={{ transformOrigin: '0 0 0' }}
                                {...({ timeout: index * 500 })}
                            >
                                <GridListTile cols={1}>
                                    {item.type === 'video' ? (
                                        <video style={{ width: '100%', height: '100%' }}
                                               controls>
                                            <source src={item.videos.standard_resolution.url} type="video/mp4"/>
                                            HTML5 Video is not supported.
                                        </video>
                                    ) : <img src={item.images.standard_resolution.url} alt={item.tags.join(',')}/>}
                                    <GridListTileBar
                                        title={Title}
                                        titlePosition="top"
                                        actionIcon={
                                            <IconButton onClick={() => this.onMediaLike(item.id, item.isUserLiked)}
                                                        style={{ padding: 'unset' }}
                                                        className={classes.icon}>
                                                <HeartIcon liked={liked}/>
                                            </IconButton>
                                        }
                                        actionPosition="left"
                                        className={classes.titleBar}
                                    />
                                </GridListTile>
                            </Grow>
                        )
                    })}
                </GridList>
            </div>
        );
    }
}

MediaGrid.propTypes = {
    classes: PropTypes.object.isRequired,
    media: PropTypes.array.isRequired
};

export default connect()(withStyles(styles)(MediaGrid));
