const { execSync } = require('node:child_process');

main();

function main() {
  const cmd = `tsc -p ./tsconfig.json && rollup -c && api-extractor run --local`;
  return execSync(cmd, { stdio: 'inherit' });
}
