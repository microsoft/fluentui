module.exports = function (options) {
  const path = require('path');
  const execSync = require('../exec-sync');
  const typescriptPath = require.resolve('typescript');

  execSync('tsc -outDir lib -t es5 -m commonjs --pretty', 'typescript es5 commonjs');

  if (options.isProduction) {
    execSync(path.join(typescriptPath, 'bin', 'tsc') + ' -outDir lib-amd -t es5 -m amd --pretty', 'typescript es5 amd');
    // execSync('tsc -outDir lib-es6 -t es6 -m es6 --pretty', 'typescript es6');
  }
};