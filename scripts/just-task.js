const path = require('path');
const { task, series, parallel } = require('just-task');
const { tscTask } = require('just-task-typescript');
const libPath = path.resolve(process.cwd(), 'lib');
const srcPath = path.resolve(process.cwd(), 'src');

task(
  'ts:commonjs',
  { builder: argv => argv.option('production') },
  tscTask(argv => {
    extraOptions = { pretty: true, inlineSources: argv.production, sourceRoot: path.relative(libPath, srcPath) };
    return { outDir: 'lib', module: 'commonjs', target: 'es5', pretty: true };
  })
);

task('build', parallel('ts:commonjs'));
