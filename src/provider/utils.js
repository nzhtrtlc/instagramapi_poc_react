import { getStore } from 'redux/configureStore';

function getState() {
    const store = getStore();
    return store.getState();
}

export function getUserInfo() {
    return getState()['user'];
}