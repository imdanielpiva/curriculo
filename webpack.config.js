const path = require('path');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const metaData = require('./src/meta');

module.exports = env => {
  const isProduction = env.production;
  const mode = isProduction ? 'production' : 'development';
  const sourceMap = true;
  const chunksSortMode = 'none';
  const minimizer = [];
  const minify = isProduction ?
    {
      removeComments: true,
      collapseWhitespace: true
    } : false;
    
  const rules = [
    {
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            sourceMap,
            publicPath: './'
          }
        },
        'css-loader'
      ]
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000'
    }
  ];

  const plugins = [
    new CleanWebpackPlugin(['dist']),
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: !isProduction
    }),
    new HtmlWebpackPlugin({
      ...metaData,
      minify,
      filename: 'index.html',
      template: './src/public/index.html',
      chunksSortMode
    }),
    new HtmlWebpackPlugin({
      ...metaData,
      filename: 'light-theme.html',
      minify,
      template: './src/public/light-theme.html',
      chunksSortMode
    }),
    new HtmlWebpackPlugin({
      ...metaData,
      filename: 'dark-theme.html',
      minify,
      template: './src/public/dark-theme.html',
      chunksSortMode
    }),
    new MiniCssExtractPlugin({
      filename: '[hash].css',
      chunkFilename: '[id].[hash].css'
    })
  ];

  rules.unshift({
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      cacheCompression: true,
      presets: [
        [
          '@babel/preset-env',
          { targets: { ie: '8' } }
        ]
      ],
      plugins: ['@babel/plugin-syntax-dynamic-import']
    }
  });

  if (isProduction) {
    plugins.push(
      new OptimizeCssAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
        canPrint: true
      })
    );

    minimizer.push(
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
        exclude: /\/node_modules/,
        sourceMap,
        extractComments: true,
        uglifyOptions: {
          ie8: true,
          safari10: true,
          warnings: false,
          toplevel: true,
          keep_fnames: false,
        }
      })
    );
  }

  return {
    entry: [
      './src/bind',
      './src/Event',
      '@babel/polyfill',
      './src/index'
    ],
    mode,
    output: {
      filename: '[hash].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    devtool: isProduction ? false : 'inline-source-map',
    devServer: {
      contentBase: './dist'
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    optimization: { minimizer },
    module: { rules },
    plugins
  };
};
