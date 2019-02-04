import * as types from 'redux/actions/actionTypes';
import genericResponseReducer from './genericResponseReducer';
import update from 'immutability-helper';

const loadState = {
    loading: false,
    loaded: false,
    error: { error: false, message: '' }
};

const initialState = {
    userInfo: {
        ...loadState,
        data: {}
    },
    userMedia: {
        ...loadState,
        data: [],
        filteredData: []
    },
    token: '',
    userLogged: false
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case types.SAVE_TOKEN: {
            const { token } = action;
            localStorage.setItem('insta_token', token);
            return {
                ...state,
                token,
                userLogged: true
            }
        }

        case types.USER_INFO_LOADING:
        case types.USER_INFO_LOADED:
        case types.USER_INFO_ERROR: {
            const userInfo = genericResponseReducer(state.userInfo, action,
                types.USER_INFO_LOADING,
                types.USER_INFO_LOADED,
                types.USER_INFO_ERROR);
            return {
                ...state,
                userInfo
            }
        }

        case types.USER_MEDIA_LOADING:
        case types.USER_MEDIA_LOADED:
        case types.USER_MEDIA_ERROR: {
            const userMedia = genericResponseReducer(state.userMedia, action,
                types.USER_MEDIA_LOADING,
                types.USER_MEDIA_LOADED,
                types.USER_MEDIA_ERROR);
            return {
                ...state,
                userMedia
            };
        }

        case types.LOAD_LIKES: {
            let likes = localStorage.getItem('likes');
            if (likes === null)
                return state;
            likes = JSON.parse(likes);
            const userMediaCopy = [...state.userMedia.data];
            likes.forEach(item => {
                const foundIndex = state.userMedia.data.findIndex(x => x.id === item.id);
                userMediaCopy[foundIndex] = { ...userMediaCopy[foundIndex], isUserLiked: item.liked };
            });

            return update(state, { userMedia: { data: { $set: userMediaCopy } } });
        }

        case types.LIKE_MEDIA: {
            let storedLikes = localStorage.getItem('likes');
            if (storedLikes === null)
                storedLikes = [];
            else
                storedLikes = JSON.parse(storedLikes);
            const userMedia = [...state.userMedia.data];
            const mediaIndex = userMedia.findIndex(x => x.id === action.mediaId);
            const foundMedia = userMedia[mediaIndex];
            const storedMedia = storedLikes.find(x => x.id === foundMedia.id);
            if (storedMedia !== undefined)
                storedMedia.liked = action.liked;
            else
                storedLikes.push({ id: action.mediaId, liked: action.liked });
            storedLikes = storedLikes.filter(x => x.liked === true);
            localStorage.setItem('likes', JSON.stringify(storedLikes));
            if (mediaIndex > -1) {
                userMedia[mediaIndex] = { ...foundMedia, isUserLiked: action.liked };
                return update(state, { userMedia: { data: { $set: userMedia } } });
            }
            return state;
        }

        case types.FILTER_SHOW_ONLY_FAVORITES: {
            const userMediaCopy = [...state.userMedia.data];
            const filteredUserMedia = userMediaCopy.filter(x => x.isUserLiked);
            return update(state, {
                userMedia: {
                    filteredData: { $set: action.checked ? filteredUserMedia : [] }
                }
            });
        }

        case types.FILTER_BY_TAG_AND_DESC: {
            const userMediaCopy = [...state.userMedia.data];
            const filteredUserMedia = userMediaCopy.filter(x => x.caption.text.toLowerCase().includes(action.value.toLowerCase()))
            return update(state, {
                userMedia: {
                    filteredData: { $set: action.value.trim().length > 0 ? filteredUserMedia : [] }
                }
            });
        }

        default:
            return state;
    }
}