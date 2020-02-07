const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = {
    DIST: path.resolve(__dirname, 'static'),
    JS: path.resolve(__dirname, 'frontend/src/js'),
};

module.exports = {
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', path.join(paths.JS, 'app-main.jsx')],
        login: ['@babel/polyfill', path.join(paths.JS, 'app-login.jsx')],
    },
    output: {
        path: paths.DIST,
        filename: 'js/app-[name].bundle.js',
        publicPath: '/resource/'
    },
    plugins: [
        new MiniCssExtractPlugin({filename: 'css/common.bundle.css'}),
        new webpack.ProvidePlugin({
            'jQuery': 'jquery',
            'window.jQuery': 'jquery',
            'jquery': 'jquery',
            'window.jquery': 'jquery',
            '$'     : 'jquery',
            'window.$'     : 'jquery'
        }),
        new webpack.ProvidePlugin({
            'fetch': 'exports-loader?self.fetch!whatwg-fetch/dist/fetch.umd'
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'common',
                    chunks: 'initial',
                    minChunks: 2
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    'file-loader?name=images/[name].[ext]',
                ],
            },
            {
                test: /\.(woff2?|ttf|eot|otf|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.less'],
    },
};
