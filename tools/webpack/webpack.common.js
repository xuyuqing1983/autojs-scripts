const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const { root } = require('./constants');
const { getEntry } = require('./entry');
const AutoJsUiPlugin = require('./autojs-ui.plugin');

module.exports = {
  entry: getEntry(),
  output: {
    path: path.join(root, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            // 6133: declared but its value is never read
            ignoreDiagnostics: [6133],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.xml$/,
        use: [
          {
            loader: path.resolve(__dirname, './autojs-xml.loader.js'),
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.xml'],
  },
  plugins: [
    new CopyPlugin([
      {
        from: path.join(root, 'projects/**/*'),
        to: path.join(root, 'dist/'),
        context: 'projects/',
        ignore: ['*.ts', '*.xml'],
      },
    ]),
    new AutoJsUiPlugin(),
  ],
};