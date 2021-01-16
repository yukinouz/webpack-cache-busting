const path = require("path");

const MODE = "production";
const enabledSourceMap = MODE === "development";

module.exports = {
  mode: MODE,
  entry: `./src/index.js`,
  devServer: {
    contentBase: "dist",
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
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2
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
    ],
  },
  // ES5(IE11等)向けの指定（webpack 5以上で必要）
  target: ["web", "es5"],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  }
};