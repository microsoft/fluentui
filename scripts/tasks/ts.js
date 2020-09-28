// @ts-check

const path = require('path');
const { tscTask, argv } = require('just-scripts');
const libPath = path.resolve(process.cwd(), 'lib');
const srcPath = path.resolve(process.cwd(), 'src');

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
    });
  },
  commonjsOnly: () => {
    const extraOptions = getExtraTscParams(argv());
    // Use default tsbuildinfo for this variant (since it's the only variant)
    return tscTask({ ...extraOptions, outDir: 'lib', module: 'commonjs' });
  },
};
