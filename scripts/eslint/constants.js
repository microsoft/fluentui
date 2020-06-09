// @ts-check

const testFiles = ['**/*.test.{ts,tsx}', '**/*.stories.tsx', '**/{test,tests,stories}/**'];

const docsFiles = ['**/*Page.tsx', '**/{docs,demo}/**', '**/*.doc.{ts,tsx}'];

const configFiles = ['just.config.ts', '/*.js', '/.*.js', 'config', 'scripts', 'tasks'];

module.exports = {
  /** Test-related files */
  testFiles,

  /** Doc-related files, not including examples */
  docsFiles,

  /** Files which may reference devDependencies: tests, docs (excluding examples), config/build */
  devDependenciesFiles: [...testFiles, ...docsFiles, ...configFiles],

  /** TS files for which TS-specific rules (including ones dependent on type info) should run */
  tsFiles: ['src/**/*.{ts,tsx}'],
  // tsFiles: ['src/**/!(*.scss).{ts,tsx}'],

  /** React code examples */
  exampleFiles: ['**/*.Example.tsx'],

  /**
   * Whether linting is running in context of lint-staged (which should disable rules requiring
   * type info due to their significant perf penalty).
   */
  isLintStaged: !!process.env.LINT_STAGED,
};
