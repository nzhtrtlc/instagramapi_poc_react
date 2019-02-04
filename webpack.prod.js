const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                uglifyOptions: { minimize: true, compress: { warnings: false } }
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(path.resolve(__dirname, 'src'), 'index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true
        }),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    //'postcss-loader',
                    //'sass-loader'
                ]
            },
            { test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=/assets/images/[name].[hash].[ext]' },
            { test: /\.ico$/, loader: 'file-loader?name=/assets/images/[name].[hash].[ext]' }
        ]
    }
});