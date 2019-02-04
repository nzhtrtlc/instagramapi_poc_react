import React from 'react';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { connect } from 'react-redux';
import { filter_showOnlyFavorites, filterByTagAndDesc } from 'redux/actions/userActions';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';

class Filter extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func
    };

    state = {
        showOnlyFavorites: false
    };

    onShowOnlyFavoritesChange = (e, checked) => {
        this.props.dispatch(filter_showOnlyFavorites(checked));
        this.setState({ showOnlyFavorites: checked });
    };

    filterByTagAndDesc = (e) => {
        const { value } = e.target;
        this.props.dispatch(filterByTagAndDesc(value));
    };

    render() {
        return (
            <div>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.showOnlyFavorites}
                            onChange={this.onShowOnlyFavoritesChange}
                            color="primary"
                        />
                    }
                    label="Show Only Favorites"
                />
                <FormControlLabel
                    style={{ marginLeft: 15 }}
                    control={
                        <Input
                            onChange={this.filterByTagAndDesc}
                            placeholder="Search in medias, tags and description"
                        />
                    }
                />
            </div>
        );
    }

}

export default connect()(Filter);