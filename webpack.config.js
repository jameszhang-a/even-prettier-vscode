/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

// eslint-disable-next-line no-undef
const webpack = require('webpack');
// eslint-disable-next-line no-undef
const path = require('path');
// eslint-disable-next-line no-undef
const extensionPackage = require('./package.json');

/**@type {import('webpack').Configuration}*/
const config = {
  target    : 'node', // vscode extensions run in webworker context for VS Code web 📖 -> https://webpack.js.org/configuration/target/#target
  entry     : './src/extension.ts', // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
  output    : {
    // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
    path                          : path.resolve(__dirname, 'dist'),
    filename                      : 'extension.js',
    libraryTarget                 : 'commonjs2',
    devtoolModuleFilenameTemplate : '../[resource-path]'
  },
  plugins   : [
    new webpack.EnvironmentPlugin({
      EXTENSION_NAME    : `${extensionPackage.publisher}.${extensionPackage.name}`,
      EXTENSION_VERSION : extensionPackage.version
    })
  ],
  devtool   : 'source-map',

  // the vscode-module is created on-the-fly and must be excluded.
  // Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
  externals : { vscode: 'commonjs vscode' },

  resolve   : {
    // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
    // look for `browser` entry point in imported node modules
    extensions : [ '.ts', '.js' ]
  },
  module    : {
    rules : [
      {
        test    : /\.ts$/,
        exclude : /node_modules/,
        use     : [ { loader: 'ts-loader' } ]
      }
    ]
  }
};
module.exports = config;
