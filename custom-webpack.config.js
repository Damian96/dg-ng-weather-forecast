const DotenvPlugin = require("dotenv-webpack");

module.exports = {
  plugins: [new DotenvPlugin()],
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify"),
    },
  },
};
