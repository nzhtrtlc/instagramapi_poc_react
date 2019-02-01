const path = require('path');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    plugins: [],
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader' },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
        ]
    }
};