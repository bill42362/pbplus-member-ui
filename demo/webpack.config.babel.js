// webpack.config.babel.js

const isProd = process.env.NODE_ENV === 'production';
const WDS_PORT = 7000;

export default {
    entry: [
        'babel-polyfill',
        './src/client/js',
    ],
    output: {
        filename: 'js/bundle.js',
        path: `${__dirname}/dist/client/`,
        publicPath: isProd ? `/` : `http://localhost:${WDS_PORT}/`,
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
            },
        ]
    },
    devtool: isProd ? false : 'source-map',
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
          react: `${__dirname}/node_modules/react`,
          'react-telephone-input': `${__dirname}/node_modules/react-telephone-input/lib/withStyles`,
        },
    },
    devServer: {
        port: WDS_PORT,
    }
}
