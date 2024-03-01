const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    fallback: {
      fs: false,
    },
  },
  output: {
    filename: "tonstakers-sdk.min.js",
    path: path.resolve(__dirname, "dist"),
    library: {
      name: "TonstakersSDK",
      type: "this",
    },
  },
  plugins: [new NodePolyfillPlugin()],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
};
