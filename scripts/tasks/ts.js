// @ts-check

const path = require('path');
const { argv } = require('just-task');
const { tscTask } = require('just-scripts');
const libPath = path.resolve(process.cwd(), 'lib');
const srcPath = path.resolve(process.cwd(), 'src');

function getExtraTscParams(args) {
  return { pretty: true, target: 'es5', ...(args.production && { inlineSources: true, sourceRoot: path.relative(libPath, srcPath) }) };
}

module.exports.ts = {
  commonjs: () => {
    const extraOptions = getExtraTscParams(argv());
    return tscTask({ ...extraOptions, outDir: 'lib-commonjs', module: 'commonjs' });
  },
  esm: () => {
    const extraOptions = getExtraTscParams(argv());
    return tscTask({ ...extraOptions, outDir: 'lib', module: 'es2015' });
  },
  amd: () => {
    const extraOptions = getExtraTscParams(argv());
    return tscTask({ ...extraOptions, outDir: 'lib-amd', module: 'amd' });
  },
  commonjsOnly: () => {
    const extraOptions = getExtraTscParams(argv());
    return tscTask({ ...extraOptions, outDir: 'lib', module: 'commonjs' });
  }
};
