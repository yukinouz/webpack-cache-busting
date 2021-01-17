const webpack = require('webpack'); 
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const MODE = "development";
const enabledSourceMap = MODE === "development";

module.exports = {
  mode: MODE,
  entry: `./src/js/app.js`,
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: '',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    watchContentBase: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // IE対応 除外設定にSwiperを含めない
        exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env', // ES2020 を ES5 に変換
              ]
            }
          }
        ]
      },
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
            loader: "postcss-loader",
            options: {
              // sourceMap: true,
              postcssOptions: {
                plugins: [
                  ["autoprefixer", { grid: true }],
                  require('css-mqpacker')(),
                  require('css-declaration-sorter')({
                    order: 'alphabetical'
                  }),
                  require('postcss-custom-properties')({
                    preserve: false
                  })
                ],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: enabledSourceMap
            },
          },
          {
            loader: 'import-glob-loader',
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
    new webpack.ProvidePlugin({
      $: 'jquery',
      "jQuery":"jquery",
      "window.jQuery":"jquery"
    }),
  ]
};