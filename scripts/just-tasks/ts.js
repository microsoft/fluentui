// @ts-check

const path = require('path');
const { task, thunk, argv } = require('just-task');
const { tscTask } = require('just-task-preset');
const libPath = path.resolve(process.cwd(), 'lib');
const srcPath = path.resolve(process.cwd(), 'src');

function getExtraTscParams() {
  const args = argv();
  return { pretty: true, target: 'es5', ...(args.production && { inlineSources: true, sourceRoot: path.relative(libPath, srcPath) }) };
}

task(
  'ts:commonjs',
  thunk(() => {
    const extraOptions = getExtraTscParams();
    return tscTask({ ...extraOptions, outDir: 'lib-commonjs', module: 'commonjs' });
  })
);

task(
  'ts:esm',
  thunk(() => {
    const extraOptions = getExtraTscParams();
    return tscTask({ ...extraOptions, outDir: 'lib', module: 'es2015' });
  })
);

task(
  'ts:amd',
  thunk(() => {
    const extraOptions = getExtraTscParams();
    return tscTask({ ...extraOptions, outDir: 'lib-amd', module: 'amd' });
  })
);
