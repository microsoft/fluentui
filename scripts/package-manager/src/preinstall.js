const { isCI } = require('./is-ci');
const { checkPackageManager } = require('./use-yarn-please');

main();

function main() {
  if (isCI()) {
    process.exit(0);
  }

  checkPackageManager();
}
