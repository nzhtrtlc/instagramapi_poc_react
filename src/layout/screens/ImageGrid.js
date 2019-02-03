import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import LikeIcon from '@material-ui/icons/Favorite';
import LikeIconBorder from '@material-ui/icons/FavoriteBorder';

const styles = () => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden'
    },
    gridList: {
        width: 500,
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

function ImageGridList(props) {
    const { classes } = props;
    const tileData = [
        { img: 'https://material-ui.com/static/images/grid-list/breakfast.jpg', title: 'test', likes: 13, liked: true },
        { img: 'https://material-ui.com/static/images/grid-list/burgers.jpg', title: 'test', likes: 5 },
        { img: 'https://material-ui.com/static/images/grid-list/burgers.jpg', title: 'test', likes: 1 },
        { img: 'https://material-ui.com/static/images/grid-list/burgers.jpg', title: 'test', likes: 6 },
        { img: 'https://material-ui.com/static/images/grid-list/burgers.jpg', title: 'test', likes: 8 },
        { img: 'https://material-ui.com/static/images/grid-list/burgers.jpg', title: 'test', likes: 8 },
        { img: 'https://material-ui.com/static/images/grid-list/burgers.jpg', title: 'test', likes: 8 },
        { img: 'https://material-ui.com/static/images/grid-list/burgers.jpg', title: 'test', likes: 8 },
        { img: 'https://material-ui.com/static/images/grid-list/burgers.jpg', title: 'test', likes: 8 },
        { img: 'https://material-ui.com/static/images/grid-list/burgers.jpg', title: 'test', likes: 8 },
    ];
    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={3}>
                {tileData.map((item, index) => {
                    return (
                        <GridListTile key={index} cols={1}>
                            <img src={item.img} alt={item.title}/>
                            <GridListTileBar
                                title={item.likes}
                                titlePosition="top"
                                actionIcon={
                                    <IconButton className={classes.icon}>
                                        {item.liked
                                            ? <LikeIcon style={{ color: 'red' }}/>
                                            : <LikeIconBorder/>}
                                    </IconButton>
                                }
                                actionPosition="left"
                                className={classes.titleBar}
                            />
                        </GridListTile>
                    )
                })}
            </GridList>
        </div>
    );
}

ImageGridList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageGridList);
