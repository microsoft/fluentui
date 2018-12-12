// @ts-check

const path = require('path');
const { thunk, argv } = require('just-task');
const { tscTask } = require('just-task-preset');
const libPath = path.resolve(process.cwd(), 'lib');
const srcPath = path.resolve(process.cwd(), 'src');

function getExtraTscParams() {
  const args = argv();
  return { pretty: true, target: 'es5', ...(args.production && { inlineSources: true, sourceRoot: path.relative(libPath, srcPath) }) };
}

exports.ts = {
  commonJs: thunk(() => {
    const extraOptions = getExtraTscParams();
    return tscTask({ ...extraOptions, outDir: 'lib-commonjs', module: 'commonjs' });
  }),
  esm: thunk(() => {
    const extraOptions = getExtraTscParams();
    return tscTask({ ...extraOptions, outDir: 'lib', module: 'es2015' });
  }),
  amd: thunk(() => {
    const extraOptions = getExtraTscParams();
    return tscTask({ ...extraOptions, outDir: 'lib-amd', module: 'amd' });
  })
};
