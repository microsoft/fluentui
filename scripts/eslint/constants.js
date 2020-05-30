// @ts-check

const testFiles = ['**/*-test.ts*', '**/*.test.ts*', '**/*.stories.tsx', '**/{test,tests,stories}/**'];

const docsFiles = ['**/*Page.tsx', '**/{docs,demo}/**', '**/*.doc.ts*'];

const devDependenciesFiles = [...testFiles, ...docsFiles, '*.config.js', 'gulpfile.ts', 'just.config.ts'];

module.exports = {
  testFiles,
  /** Doc-related files, not including examples */
  docsFiles,
  /** Files which are allowed to have dev dependencies */
  devDependenciesFiles,
};
