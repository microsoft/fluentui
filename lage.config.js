// Configuration documentation: https://microsoft.github.io/lage/guide/config.html
module.exports = {
  pipeline: {
    build: ['^build'],
    'build:info': [],
    bundle: ['build'],
    'bundle-size': ['build'],
    'build-storybook': [],
    // adding temporary back until import plugin rule is resolved https://github.com/microsoft/fluentui/issues/27727
    lint: ['build'],
    clean: [],
    test: ['build'],
    'generate-api': ['^generate-api'],
    'test-ssr': [],
    'type-check': ['build'],
    'code-style': [],
    'update-snapshots': ['^update-snapshots'],
    '@fluentui/docs#build': ['@fluentui/react-northstar#build:info'],
    'verify-packaging': ['build'],
    e2e: [],
    '@fluentui/web-components#e2e': ['build-storybook'],
  },

  // Adds some ADO-specific logging commands for reporting failures
  ...(process.env.TF_BUILD && { reporter: 'adoLog' }),

  // Ignores these minimatch patterns when considers what packages have changed for the --since flag
  ignore: [
    'change/**',
    'rfcs/**',
    'README.md',
    '*.md',
    '.vscode/**',
    '.github/*.yml',
    '.github/*.json',
    '.github/*.md',
    '.github/CODEOWNERS',
    '.github/MAINTAINERS',
    '.github/ISSUE_TEMPLATE/**',
    '.github/policies/**',
    '.devcontainer/**',
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
