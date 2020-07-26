const path = require('path');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },
      {test: /\.css$/, use: ["postcss-loader"]},
      { test: /\.scss$/i, use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {test: /\.(png|jpe?g|gif)$/i, use: [{loader: 'url-loader',
      options: {
        limit: 8192,
      },},{loader: 'file-loader'}],
      },
      {test: /\.html$/i, loader: 'html-loader'},
      {test: /\.(jpe?g|png|gif|svg)$/i, use: ['url-loader?limit=10000','img-loader']
      },
    ]
  },
  plugins: [new MiniCssExtractPlugin({filename: "styles.css"}), new HtmlWebpackPlugin({template: './src/index.html'}), require('autoprefixer'), new CleanWebpackPlugin(),  new WebpackBar(), new FriendlyErrorsWebpackPlugin(),  new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.optimize\.css$/g,
    cssProcessor: require('cssnano'),
    cssProcessorPluginOptions: {
      preset: ['default', { discardComments: { removeAll: true } }],
    },
    canPrint: true
  })],
  devServer: {
    port: 1234
  }

};