const path = require('path');
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: './public/index.html',    //需要放打包文件的html模板路径
      filename: 'index.html'   //打包完成后的这个模板叫什么名字
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build',
    port: '8081',
    historyApiFallback: true,
    proxy: {
      '/api': {    // 设置请求前增加的值，这个值会代替我们的网址进行请求
        open: true,
        target: 'http://110.42.161.84:8016',    // 这个就是我们设置的代理服务器地址
        changeOrigin: true,                    // 这个值就是用来跨域的，默认为false
        pathRewrite: {'^/api': '/api'}
      },
      '/upload_files': {
        open: true,
        target: 'http://110.42.161.84:8016',    
        changeOrigin: true,                    
        pathRewrite: {'^/upload_files': '/upload_files'}
      }
    },
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    // publicPath: './'
  },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
    extensions: [
      '.js', '.jsx', '.ts', '.tsx'
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                "@babel/plugin-proposal-class-properties",
              ]
            }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/i,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.toml$/i,
        type: 'json',
        parser: {
          parse: toml.parse,
        },
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },
};