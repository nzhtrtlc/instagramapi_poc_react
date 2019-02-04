import * as types from './actionTypes';
import InstagramAPIService from 'redux/InstagramAPIService';

export function getUserInfo() {
    return async dispatch => {
        dispatch({ type: types.USER_INFO_LOADING });
        const instagramAPI = new InstagramAPIService();
        try {
            const response = await instagramAPI.get('/users/self/');
            dispatch({ type: types.USER_INFO_LOADED, data: response.data.data });
        }
        catch (error) {
            dispatch({ type: types.USER_INFO_ERROR, error });
        }
    };
}

export function getUserMedia() {
    return async dispatch => {
        dispatch({ type: types.USER_MEDIA_LOADING });
        const instagramAPI = new InstagramAPIService();
        try {
            const response = await instagramAPI.get('/users/self/media/recent/');
            dispatch({ type: types.USER_MEDIA_LOADED, data: response.data.data });
            dispatch({ type: types.LOAD_LIKES });
        }
        catch (error) {
            dispatch({ type: types.USER_MEDIA_ERROR, error });
        }
    };
}

export function saveToken(token) {
    return {
        type: types.SAVE_TOKEN,
        token
    };
}

export function likeMedia(mediaId, liked) {
    return {
        type: types.LIKE_MEDIA,
        mediaId,
        liked
    };
}

export function filter_showOnlyFavorites(checked) {
    return {
        type: types.FILTER_SHOW_ONLY_FAVORITES,
        checked
    };
}

export function filterByTagAndDesc(value) {
    return {
        type: types.FILTER_BY_TAG_AND_DESC,
        value
    };
}