const path = require('path');
// 用于提取CSS文件，把样式提取到单独文件中
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 当前命令所在的目录
const cwd = process.cwd();
module.exports = {
  mode: 'development', // 开发模式，不压缩
  devtool: false, // 关闭生成sourcemap
  entry: {
    antd: './index.js', // 入口文件
  },
  output: { // 输出
    path: path.resolve('dist'),
    filename: '[name].js', // 打包后的文件 antd.css
    library: 'antd', // 打包后库的名字
    libraryTarget: 'umd', // 打包后模块的格式 umd amd cmd commonjs commonjs2 window
  },
  externals: { // 外部依赖 组件库代码不需要打包react和react-dom进去的
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'] // 指定扩展名
  },
  module: {
    rules: [{
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 将这些CSS收藏起来 后面通过插件写入单独的css
          {
            loader: 'css-loader', // 处理@import和url
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader', // 添加厂商前缀
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader', // 把less编译成css
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
              sourceMap: true,
            },
          },
        ],
      },
      { // file-loader和url-loader在webpack5里面已经废弃
        test: /\.(png|jpg|jpeg|gif|svg)(\?v=\d+\.\d+\.\d+)?$/i,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};