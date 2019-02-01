import React from 'react';
import ReactDOM from 'react-dom';

const title = 'My Minimal React Webpack Babel Setup 11';

function App() {
    return (
        <div>{title}</div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));

if(module.hot){
    module.hot.accept();
}