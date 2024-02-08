// @ts-check
const { output, workspaceRoot } = require('@nx/devkit');
const { execSync } = require('child_process');

main();

function main() {
  output.logSingleLine('Preparing verdaccio...');

  try {
    require.resolve('verdaccio');
    output.logSingleLine('Verdaccio already installed...✅');
  } catch {
    output.logSingleLine('Installing verdaccio...');
    execSync('yarn add -DW verdaccio@5 --ignore-scripts', { stdio: 'inherit', cwd: workspaceRoot });
  }

  output.logSingleLine('Verdaccio ready to start');
}
