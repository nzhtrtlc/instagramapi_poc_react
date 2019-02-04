import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux/configureStore';
import Home from 'layout/screens/Home/Home';

const store = configureStore();
ReactDOM.render(
    <Provider store={store}>
        <Home/>
    </Provider>, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}