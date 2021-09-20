module.exports = {
  presets: [
    '@babel/preset-react', // 把React编译成es5
    [
      '@babel/preset-env', // ES6编译成ES5
      {
        modules: 'auto',
        targets: { // 编译兼容的目标
          browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 11'],
        },
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-typescript', // 支持TypeScript
      {
        isTSX: true,
      },
    ],
    // 提供编译的运行时帮助方法
    ['@babel/plugin-transform-runtime'],
  ],
};