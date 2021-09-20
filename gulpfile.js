const gulp = require('gulp'); // 定义执行任务
const path = require('path'); // 处理路径
const rimraf = require('rimraf'); // rm -rf
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const merge2 = require('merge2');
const { compilerOptions } = require('./tsconfig.json');
const tsConfig = {
  noUnusedParameters: true, // 不能有未使用的参数
  noUnusedLocals: true, // 不能有未使用的本地变量
  strictNullChecks: true, // 严格的Null检查
  target: 'es6', // 编译的目标
  jsx: 'react', // jsx如何处理 preserve处理不保留 react变成React.createElement
  moduleResolution: 'node', // 模块查找规则 node
  declaration: true, // 生成声明文件 d.ts
  allowSyntheticDefaultImports: true, // 允许 默认导入
  ...compilerOptions,
};
const babelConfig = require('./babel.config');
// 准备好的编译的文件
// glob文件匹配模板。类型于正则
const source = [
  'components/**/*.{js,ts,jsx,tsx}',
  '!components/**/*.stories.{js,ts,jsx,tsx}',
  '!components/**/e2e/*',
  '!components/**/unit/*',
];
const base = path.join(process.cwd(), 'components');

function getProjectPath(filePath) {
  return path.join(process.cwd(), filePath);
}
const libDir = getProjectPath('lib');
const esDir = getProjectPath('es');

gulp.task('compile-with-es', (done) => {
  console.log('Compile to es...');
  compile(false).on('finish', done);
});

gulp.task('compile-with-lib', (done) => {
  console.log('Compile to js...');
  compile().on('finish', done);
});
gulp.task('compile', gulp.parallel('compile-with-es', 'compile-with-lib'));
/**
 * 执行编译
 * @param {*} modules 是否要转换模块
 * @returns 
 */
function compile(modules) {
  const targetDir = modules === false ? esDir : libDir;
  rimraf.sync(targetDir); // 删除老的内容 rm -rf
  // 把文件匹配模式传给gulp，gulp会按照这个模式把文件匹配耆老
  // ts转译后会生成两个流，一个流是js一个流是类型声明d.ts
  const { js, dts } = gulp.src(source, { base }).pipe(ts(tsConfig));
  const dtsFilesStream = dts.pipe(gulp.dest(targetDir));
  let jsFilesStream = js;
  if (modules) { // 如果要转换成ES5，就用babel进行转义
    jsFilesStream = js.pipe(babel(babelConfig));
  }
  jsFilesStream = jsFilesStream.pipe(gulp.dest(targetDir));
  return merge2([jsFilesStream, dtsFilesStream]);
}