const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpack = require('webpack');

const path = require('path');

module.exports = env => {
    const devMode = !env || !env.production;

    return {
        mode: 'development',
        entry: {
            main: './src/app/index.js',
            typescript_demo: './src/app/typescript_demo.ts'
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'assets/js/[name].js',
            library: 'MainModule'
        },

        watchOptions: {
            poll: true,
            ignored: /node_modules/
        },

        /*entry: {
            app: [
                "@babel/polyfill",
                './src/app/index.js'
            ]
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'js/app.bundle.js'
        },*/


        /*
        devServer: {
            port: 4000
        },
        */


        /*
        devServer: {
            port: 3000,
            overlay: true,
            historyApiFallback: true,
            open: true,
            hot: false,
            watchOptions: {
                // Delay the rebuild after the first change
                aggregateTimeout: 300,
                // Poll using interval (in ms, accepts boolean too)
                poll: 1000,
            },
            watchContentBase: true,
        },
        */

        module: {
            rules: [
                {
                    // HTML LOADER
                    // Super important: We need to test for the html
                    // as well as the nunjucks files
                    test: /\.html$|njk|nunjucks/,
                    use: [
                        'html-loader',
                        {
                            loader: 'nunjucks-html-loader',
                            options: {
                                // Other super important. This will be the base
                                // directory in which webpack is going to find
                                // the layout and any other file index.njk is calling.
                                //  searchPaths: [...returnEntries('./src/pages/**/')]
                                // Use the one below if you want to use a single path.
                                searchPaths: ['./src/app/view']
                            }
                        }
                    ]
                },

               
                {
                    test: /\.ts(x?)$/,
                    exclude: /node_modules/,
                    use: [
                    {
                        loader: 'babel-loader',
                        query: {
                        presets: [
                            '@babel/preset-env'
                        ]
                        }
                    },
                    {
                        loader: 'ts-loader'
                    }
                    ]
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    loader: 'file-loader',
                    options: {
                        name: 'assets/img/[name].[ext]'
                    }
                },
                {
                    test: /\.(svg|eot|woff|woff2|ttf)$/,
                    use: ['file-loader']
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                }
            ]
        },


        

        watch: true,
        plugins: [
            new webpack.LoaderOptionsPlugin({
                debug: true
            }),
            
            new BrowserSyncPlugin({
                // browse to http://localhost:3000/ during development,
                // ./public directory is being served
                host: 'localhost',
                port: 3000,
                server: { baseDir: ['dist'] },
                
            }),

            new HtmlWebpackPlugin({
                template: './src/app/view/pages/index.njk'
            }),

            new ExtraWatchWebpackPlugin({
                dirs: ['/src/app/view']
            }),

            new MiniCssExtractPlugin({
                filename: 'css/app.bundle.css'
            })
        ]

    }

};