const path = require('path');
const merge = require('webpack-merge');
const CommCfg = require('./common.config.js');
const APP_PATH = path.join(__dirname, '..');
const AppCfg = require('../src/config');
const devConfig = {
  devtool: 'inline-source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      path.join(APP_PATH, 'src/index.js')
    ]
  },
  output: {
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader', options: {
              sourceMap: true, modules: true,
              localIdentName: '[local]_[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js'
              }
            }
          },
          {
            loader: 'sass-loader', options: { sourceMap: true }
          }
        ]
      }
    ]
  },
  devServer: {
    port: AppCfg.port || 20000,
    historyApiFallback: { index: AppCfg.app.BaseName },
    host: AppCfg.host || '0.0.0.0'
  },
};

const mergeCfg = merge({
  customizeArray(a, b, key) {
    /**
     * entry.app不合并，全替换
     */
    if (key === 'entry.app') {
      return b;
    }
    return undefined;
  }
})(CommCfg, devConfig);

module.exports = mergeCfg;
