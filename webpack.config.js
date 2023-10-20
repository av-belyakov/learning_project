const path = require('path');
module.exports = {
  entry: './ui/static/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};