const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const GhPagesWebpackPlugin = require('gh-pages-webpack-plugin');
const webpack = require('webpack')
const autoprefixer = require('autoprefixer');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: ['@babel/polyfill', './index.ts'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 4200,
        writeToDisk: true,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript'
                        ]
                    }
                }
            },
            {
                test: /\.pug$/,
                use: [
                    "html-loader",
                    "pug-html-loader"
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {publicPath: '../'}
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer()
                            ],
                        }
                    },
                    'sass-loader'
                ],
            },
            {
                test: /\.(woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    outputPath: './fonts'
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/styles.css',
        }),
        new HtmlWebpackPlugin({
            template: './index.pug',
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new GhPagesWebpackPlugin({
            path: path.resolve(__dirname, 'dist')
        }),
        new webpack.DefinePlugin({
            NODE_ENV: process.env.NODE_ENV
        })
    ]
}