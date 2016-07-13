/**
 * Created by xiadd on 7/11/16.
 */
var path = require('path')
var webpack = require('webpack')
module.exports = {
  entry: path.resolve(__dirname, '../client/main.js'),
  output: {
    path: path.resolve(__dirname, '../public/dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
      filename: "commons.js"
    })
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: false,
  vue: {
    loaders: {
      sass: 'style!css!sass?indentedSyntax',
      scss: 'style!css!sass'
    }
  }
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = false;
  // http://vuejs.github.io/vue-loader/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}
