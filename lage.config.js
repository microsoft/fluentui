module.exports = {
  pipeline: {
    build: ['^build'],
    bundle: ['build'],
    vrtest: ['build'],
    lint: ['build'],
    clean: [],
    test: ['build'],
    'code-style': [],
    'update-snapshots': ['^update-snapshots'],
  },

  ignore: ['change/**', 'README.md'],

  cacheOptions: {
    outputGlob: [
      'dist/**/*',
      'lib/**/*',
      'lib-commonjs/**/*',
      'lib-amd/**/*',
      'esm/**/*',
      '**/*.source.json',
      '**/*.info.json',
      '**/*.scss.ts',
      '**/dist.stats.json',
      'dist-storybook/**/*',
      '**/*.tar.gz',
      '!bower_components',
      '!node_modules',
      'lib-es2015/**/*',
      'coverage/**/*',
    ],

    // These are relative to the git root
    environmentGlob: ['.devops/**/*', '*.js', '*.json', '*.yml'],
  },
};
