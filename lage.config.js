// Configuration documentation: https://microsoft.github.io/lage/guide/config.html
module.exports = {
  pipeline: {
    build: ['^build'],
    bundle: ['build'],
    screener: ['build'],
    lint: ['build'],
    clean: [],
    test: ['build'],
    'code-style': [],
    'update-snapshots': ['^update-snapshots'],
    '@fluentui/docs:build': ['@fluentui/react-northstar:test'],
  },

  // Ignores these minimatch patterns when considers what packages have changed for the --since flag
  ignore: ['change/**', 'README.md'],

  // All of these options are sent to `backfill`: https://github.com/microsoft/backfill/blob/master/README.md
  cacheOptions: {
    // These are the subset of files in the package directories that will be saved into the cache
    outputGlob: [
      'dist/**/*',
      'lib/**/*',
      'lib-commonjs/**/*',
      'lib-amd/**/*',
      'esm/**/*',
      '**/*.source.json',
      '**/*.info.json',
      '**/dist.stats.json',
      'dist-storybook/**/*',
      '**/*.tar.gz',
      '!bower_components',
      '!node_modules',
      'lib-es2015/**/*',
      'coverage/**/*',
      'src/**/*.scss.ts',
    ],

    // These are relative to the git root, and affects the hash of the cache
    // Any of these file changes will invalidate cache
    environmentGlob: ['.devops/**/*', '*.js', '*.json', '*.yml'],
  },
};
