// @ts-check

const path = require('path');
const { tscTask, argv } = require('just-scripts');
const libPath = path.resolve(process.cwd(), 'lib');
const srcPath = path.resolve(process.cwd(), 'src');
// Temporary hack: only use tsbuildinfo file for things under packages/fluentui
const useTsBuildInfo =
  /[\\/]packages[\\/]fluentui[\\/]/.test(process.cwd()) && path.basename(process.cwd()) !== 'perf-test';

function getExtraTscParams(args) {
  return {
    pretty: true,
    target: 'es5',
    // sourceMap must be true for inlineSources and sourceRoot to work
    ...(args.production && { inlineSources: true, sourceRoot: path.relative(libPath, srcPath), sourceMap: true }),
  };
}

module.exports.ts = {
  commonjs: () => {
    const extraOptions = getExtraTscParams(argv());
    return tscTask({
      ...extraOptions,
      outDir: 'lib-commonjs',
      module: 'commonjs',
      ...(useTsBuildInfo && { tsBuildInfoFile: '.commonjs.tsbuildinfo' }),
    });
  },
  esm: () => {
    const extraOptions = getExtraTscParams(argv());
    // Use default tsbuildinfo for this variant
    return tscTask({ ...extraOptions, outDir: 'lib', module: 'esnext' });
  },
  amd: () => {
    const extraOptions = getExtraTscParams(argv());
    return tscTask({
      ...extraOptions,
      outDir: 'lib-amd',
      module: 'amd',
      ...(useTsBuildInfo && { tsBuildInfoFile: '.amd.tsbuildinfo' }),
    });
  },
  commonjsOnly: () => {
    const extraOptions = getExtraTscParams(argv());
    // Use default tsbuildinfo for this variant (since it's the only variant)
    return tscTask({ ...extraOptions, outDir: 'lib', module: 'commonjs' });
  },
};
