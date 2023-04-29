const DotenvPlugin = require("dotenv-webpack");
const path = require("path");

module.exports = {
  plugins: [new DotenvPlugin()],
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify"),
    },
  },
};
