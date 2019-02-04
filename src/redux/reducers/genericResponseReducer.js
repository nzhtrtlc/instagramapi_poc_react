import get from 'lodash.get';
import has from 'lodash.has';

export default function genericResponseReducer(state,
                                               action,
                                               LOADING_ACTION_TYPE,
                                               LOADED_ACTION_TYPE,
                                               ERROR_ACTION_TYPE) {

    switch (action.type) {
        case LOADING_ACTION_TYPE : {
            return {
                ...state,
                loading: true,
                loaded: false,
                error: { error: false }
            };
        }
        case LOADED_ACTION_TYPE : {
            return {
                ...state,
                loading: false,
                loaded: true,
                data: action.data,
                error: { error: false }
            };
        }
        case ERROR_ACTION_TYPE : {
            if (typeof(action.error) != 'undefined')
                return {
                    ...state,
                    loading: false,
                    loaded: false,
                    error: {
                        error: true,
                        message: has(action, 'error.message') ? get(action, 'error.message') : get(action, 'error', 'Error'),
                        statusCode: get(action, 'error.response.status')
                    },
                };
            else
                return {
                    ...state,
                    loading: false,
                    loaded: false,
                    error: { error: true, message: '' },
                };
        }
        default:
            return state;
    }
}
