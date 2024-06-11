export default {
  globs: ['src/**/*.ts', './src/fluent-design-system.ts'],
  exclude: [
    './src/**/*.md',
    './src/index-rollup.ts',
    './src/**/*.spec.ts',
    './src/**/*.stories.ts',
    './src/theme/',
    './src/patterns/',
    './src/utils/',
    './src/helpers.tests.ts',
    './src/helpers.stories.ts',
    './src/utils/',
  ],
  outdir: './dist',
  packagejson: true,
  fast: true,
  plugins: [],
};
