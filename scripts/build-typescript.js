// This script provides scaffolding around running the typescript compiler.

const { execSync } = require('child_process');
const rimraf = require('rimraf').sync;
const path = require('path');

// tsc --outDir lib-es6 --module es6
const getScriptCommand = (outDir, module) => `tsc --outDir ${outDir} --module ${module}`;
const isProduction = process.argv.indexOf("--production") >= 0;

/**
 * Builds typescript modules.
 */
function buildTypeScript(outDir, moduleType) {
  console.log(`Building TypeScript ${moduleType} modules.`);

  rimraf(outDir);

  execSync(getScriptCommand(outDir, moduleType), {
    stdio: [0, 1, 2]
  });
}

// Only build AMD and ES6 in production builds.
if (isProduction) {
  buildTypeScript('lib-amd', 'amd');
  buildTypeScript('lib-es6', 'es6');
}
