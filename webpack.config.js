var webpack = require("webpack");
var path = require("path");

var BUILD_DIR = path.resolve(__dirname, "client/dist");
var APP_DIR = path.resolve(__dirname, "client/src");

// Have two terminal tabs open - one that is running
// `npm run dev-react` and one that is running `npm start`
var config = {
    entry: APP_DIR + "/index.jsx",
    module: {
      loaders: [{
          test: /\.jsx?/,
          include: APP_DIR,
          loader: "babel-loader",
          query: {
            presets: ["es2015", "react"]
          }
        },
        {
          test: /\.css$/,
          loader: "style-loader"
        },
        {
          test: /\.css$/,
          loader: 'css-loader',
          query: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]'
          }
                }
        ]
      },
      output: {
        path: BUILD_DIR,
        filename: "bundle.js"
      }
    };

    module.exports = config;