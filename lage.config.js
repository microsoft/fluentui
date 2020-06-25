module.exports = {
  pipeline: {
    build: ['^build'],
    bundle: ['build'],
    vrtest: ['build'],
    lint: [],
    clean: [],
    test: ['build'],
    'code-style': [],
    'update-snapshots': ['^update-snapshots'],
  },

  cacheOptions: {
    outputGlob: [
      'dist/**/*',
      'lib/**/*',
      'lib-commonjs/**/*',
      'lib-amd/**/*',
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
  },
};
