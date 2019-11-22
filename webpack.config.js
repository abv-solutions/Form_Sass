const path = require('path');
module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: './app.bundle.js'
  },
  module: {
    rules: [{
      test: /\.js?$/,
      loader: 'babel-loader',
      query: {
        presets: ['@babel/env']
      }
    }]
  }
}
