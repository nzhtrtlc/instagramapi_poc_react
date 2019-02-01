import { applyMiddleware, compose, createStore } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from 'redux/reducers';

let store = null;

function configureStoreProd(initialState) {
    const middlewares = [thunk];

    store = createStore(rootReducer, initialState, compose(
        applyMiddleware(...middlewares)
    ));
    return store;
}

function configureStoreDev(initialState) {
    const middlewares = [reduxImmutableStateInvariant(), thunk];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
    store = createStore(rootReducer, initialState, composeEnhancers(
        applyMiddleware(...middlewares)
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('redux/reducers', () => {
            const nextReducer = require('redux/reducers').default; // eslint-disable-line global-require
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;


export function getStore() {
    return store;
}

export function setStore(_store) {
    store = _store;
}

export default configureStore;
