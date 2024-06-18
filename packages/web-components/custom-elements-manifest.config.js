export default {
  globs: ['src/**/*.ts'],
  /** Globs to exclude */
  exclude: [
    '*.js',
    '*.ts',
    'src/helpers.stories.ts',
    'src/helpers.tests.ts',
    'src/index-rollup.ts',
    'src/utils/benchmark-wrapper.ts',
    'src/**/*.bench.ts',
    'src/**/*.spec.ts',
    'src/**/*.stories.ts',
    'src/**/define.ts',
    'src/**/index.ts',
    'src/**/*.md',
  ],
  outdir: './dist',
  packagejson: true,
  fast: true,
  plugins: [],
};
