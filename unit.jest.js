module.exports = {
    verbose: true, // 显示日志
    testEnvironment: 'jsdom', // 运行测试的环境
    setupFiles: ['./tests/setup.js'],
    testMatch: ['**/unit/**/*.(spec|test).(js|ts|jsx|tsx)'],
    collectCoverage: true,
    collectCoverageFrom: [
      'components/**/*.(js|ts|jsx|tsx)',
      '!components/**/*.stories.(js|ts|jsx|tsx)',
      '!components/**/*.(spec|test).(js|ts|jsx|tsx)',
    ],
  };