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
  },

  // Ignores these minimatch patterns when considers what packages have changed for the --since flag
  ignore: ['change/**', 'README.md'],

  // All of these options are sent to `backfill`: https://github.com/microsoft/backfill/blob/master/README.md
  cacheOptions: {
    // These are the subset of files in the package directories that will be saved into the cache
    // Lots of these are from .gitignore file
    outputGlob: [
      // dist files
      'dist/**/*',
      'dist-storybook/**/*',
      '**/dist.stats.json',

      // generated files in src
      'coverage/**/*',
      'src/componentInfo/**/*',
      'src/componentMenu.json',
      'src/behaviorMenu.json',
      'src/bundleStats.json',
      'src/currentBundleStats.json',
      'src/exampleMenus/**/*',
      'src/exampleSources/**/*',
      'src/schema.ts',
      'src/**/*.scss.ts',
      '**/*.source.json',
      '**/*.info.json',
      '**/*.tar.gz',
      '**/*.event.ts',
      '**/*.resx.ts',

      // lib output
      'lib/**/*',
      'lib-commonjs/**/*',
      'lib-amd/**/*',
      'lib-es2015/**/*',
      'esm/**/*',
      '!bower_components',
      '!node_modules',
    ],

    // These are relative to the git root, and affects the hash of the cache
    // Any of these file changes will invalidate cache
    environmentGlob: ['.devops/**/*', '*.js', '*.json', '*.yml'],
  },
};
