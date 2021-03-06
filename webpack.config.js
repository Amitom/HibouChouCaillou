/*
    ./webpack.config.js
*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './client/index.js',

  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },

  mode: 'development',

  resolve: {
    alias: {
      components: path.resolve(__dirname, 'client/components'),
      assets: path.resolve(__dirname, 'client/assets'),
    }
  },

  module: {
    rules: [
      { test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader"},
          { loader: "sass-loader"}
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },

  plugins: [
    HtmlWebpackPluginConfig,
  ],
}