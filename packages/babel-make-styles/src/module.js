// @ts-check
const { findGitRoot } = require('@fluentui/scripts/monorepo');
const babelRegister = require('@babel/register');

const rootDir = findGitRoot();

console.log('BABEL-MAKE-STYLES', { rootDir });

babelRegister(
  /** @type {import('@babel/core').TransformOptions & {extensions?:string[];cache?:boolean}} */ ({
    presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
    cwd: rootDir,
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
  }),
);

module.exports = require('./index');
