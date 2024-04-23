// @ts-check
const { output, workspaceRoot, getPackageManagerCommand } = require('@nx/devkit');
const { execSync } = require('child_process');

main();

function main() {
  output.logSingleLine('Preparing verdaccio...');

  try {
    require.resolve('verdaccio');
    output.logSingleLine('Verdaccio already installed...✅');
  } catch {
    output.logSingleLine('Installing verdaccio...');
    const pm = getPackageManagerCommand();
    const cmd = `${pm} add -DW verdaccio@5 --ignore-scripts`;
    execSync(cmd, { stdio: 'inherit', cwd: workspaceRoot });
  }

  output.logSingleLine('Verdaccio ready to start');
}
