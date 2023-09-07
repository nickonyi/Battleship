// webpack.config.js
const path = require('path');

module.exports = {
    mode: "development",
    devServer: {
      static: "./dist",
    },
  entry: './src/index.js', // Entry point of your application
  output: {
    filename: 'main.js', // Output bundle filename
    path: path.resolve(__dirname, 'dist')
}
};