// webpack.config.js
const path = require('path');

module.exports = {
    mode: "development",
    devServer: {
        static: "./dist",
        allowedHosts: ['.ngrok-free.app'],
    },
    entry: './src/index.js',
    devtool: 'inline-source-map',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
};