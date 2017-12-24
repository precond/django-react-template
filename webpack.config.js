const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = {
    DIST: path.resolve(__dirname, 'static'),
    JS: path.resolve(__dirname, 'frontend/src/js'),
};

module.exports = {
    entry: [
        'babel-polyfill',
        'whatwg-fetch',
        path.join(paths.JS, 'app.jsx'),
    ],
    output: {
        path: paths.DIST,
        filename: 'js/app.bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new ExtractTextPlugin('css/app.bundle.css'),
        new webpack.ProvidePlugin({
            'jQuery': 'jquery',
            'window.jQuery': 'jquery',
            'jquery': 'jquery',
            'window.jquery': 'jquery',
            '$'     : 'jquery',
            'window.$'     : 'jquery'
        }),
    ],
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
                loader: ExtractTextPlugin.extract({
                    use: 'css-loader!less-loader',
                }),
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
