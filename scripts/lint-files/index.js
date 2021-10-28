// @ts-check
const { lintFiles: lintTslintFiles } = require('./no-tslint');
const { lintFiles: lintExampleFiles } = require('./no-old-example-paths');
const { lintFiles: lintChangeFiles } = require('./no-example-change-files');

if (require.main === module) {
  if (lintTslintFiles() || lintExampleFiles() || lintChangeFiles()) {
    process.exit(1);
  }
}
