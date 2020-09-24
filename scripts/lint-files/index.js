// @ts-check
const { lintFiles: lintTslintFiles } = require('./no-tslint');
const { lintFiles: lintExampleFiles } = require('./no-old-example-paths');

if (require.main === module) {
  if (lintTslintFiles() || lintExampleFiles()) {
    process.exit(1);
  }
}
