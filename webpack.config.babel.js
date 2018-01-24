// webpack.config.babel.js

const isProd = process.env.NODE_ENV === 'production';

export default {
    entry: [
        './src/js/index.js',
    ],
    output: {
        filename: 'js/index.js',
        path: `${__dirname}/dist/`,
        publicPath: isProd ? `/` : `http://localhost:${WDS_PORT}/`,
        libraryTarget: 'commonjs2',
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'style-loader', },
                    { loader: 'css-loader', },
                    { loader: 'less-loader', },
                ],
            },
            {
                test: /\.css/,
                use: [
                    { loader: 'style-loader', },
                    { loader: 'css-loader', },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    { loader: 'url-loader', options: {limit: 100000}, },
                    { loader: 'img-loader', options: {
                        enabled: process.env.NODE_ENV === 'production',
                        gifsicle: { interlaced: false },
                        mozjpeg: {
                            progressive: true,
                            arithmetic: false
                        },
                        optipng: false, // disabled 
                        pngquant: {
                            floyd: 0.5,
                            speed: 2
                        },
                        svgo: {
                            plugins: [
                                { removeTitle: true },
                                { convertPathData: false }
                            ]
                        }
                    }, },
                ]
            }
        ]
    },
    devtool: isProd ? false : 'source-map',
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
          react: `${__dirname}/node_modules/react`,
          ReactTelephoneInput: `${__dirname}/node_modules/react-telephone-input`,
        },
    },
    externals: {
        react: 'commonjs react'
    }
};
