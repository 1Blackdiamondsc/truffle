const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const WriteFilePlugin = require("write-file-webpack-plugin");

const commonConfig = require("./webpack.config-common.js");

module.exports = merge(commonConfig, {
  module: {
    rules: [
      {
        test: /\.(js)/,
        include: path.resolve("lib"),
        loader: "istanbul-instrumenter-loader",
        options: {
          esModules: true
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: [["babel-preset-env", { targets: { node: "6.14" } }]],
          plugins: [
            "@babel/plugin-proposal-object-rest-spread",
            "@babel/plugin-transform-runtime"
          ],
          sourceType: "module"
        },
        include: [
          path.resolve(__dirname, "..", "lib"),
          path.resolve(__dirname, "..", "test")
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("test")
    }),

    new WriteFilePlugin()
  ],

  devtool: "#inline-cheap-module-source-map"
});
