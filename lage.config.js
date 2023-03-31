// Configuration documentation: https://microsoft.github.io/lage/guide/config.html
module.exports = {
  pipeline: {
    build: ['^build'],
    /**
     * This task definition exist only in v0 projects - dependent build:info are executed by lerna
     * It's purpose is to not run build:info on all dependent packages from lage as it is invoked under the hood via gulp (triggers lerna)
     * TODO: this won't be needed when we switch to NX
     */
    'build:info': [],
    bundle: ['build'],
    'bundle-size': ['build'],
    lint: [],
    clean: [],
    test: ['build'],
    'type-check': ['build'],
    'code-style': [],
    'update-snapshots': ['^update-snapshots'],
  },

  // Adds some ADO-specific logging commands for reporting failures
  ...(process.env.TF_BUILD && { reporter: 'adoLog' }),

  // Ignores these minimatch patterns when considers what packages have changed for the --since flag
  ignore: [
    'change/**',
    'rfcs/**',
    'README.md',
    '.vscode/**',
    '.github/*.yml',
    '.github/*.json',
    '.github/*.md',
    '.github/CODEOWNERS',
    '.github/MAINTAINERS',
    '.github/ISSUE_TEMPLATE/**',
  ],

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
      '**/*.tar.gz',
      '!bower_components',
      '!node_modules',
      'lib-es2015/**/*',
      'coverage/**/*',
      'src/**/*.scss.ts',
    ],

    // These are relative to the git root, and affects the hash of the cache
    // Any of these file changes will invalidate cache
    environmentGlob: ['.devops/**/*', '*.js', '*.json', '*.yml', 'apps/pr-deploy-site'],
  },
};
