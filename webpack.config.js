const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const webpack = require('webpack'); 
const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const MODE = "development";
const enabledSourceMap = MODE === "development";

module.exports = {
  mode: MODE,
  entry: `./src/index.js`,
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: '',
  },
  devServer: {
    contentBase: "./dist",
    open: true
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: enabledSourceMap,
              importLoaders: 2 // postcss-loader, sass-loader
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: enabledSourceMap
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        use: [{
          loader: "file-loader",
          options: {
            name: './[path][name].[ext]',
            outputPath: 'imgs',
          },
        }]
      },
    ],
  },
  target: ["web", "es5"],   // ES5(IE11等)向けの指定（webpack 5以上で必要）
  plugins: [
    new HtmlWebpackPlugin({
      // filename: 'index.html',
      template: "./src/template.html",
      minify: false
    }),
    new CleanWebpackPlugin(),
  ]
};