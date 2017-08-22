module.exports = function (options) {
  const path = require('path');
  const execSync = require('../exec-sync');
  const typescriptPath = 'node ' + path.resolve(require.resolve('typescript/lib/tsc'));

  execSync(typescriptPath + ' -outDir lib -t es5 -m commonjs --pretty', 'typescript commonjs/es5');

  if (options.isProduction) {
    execSync(typescriptPath + ' -outDir lib-amd -t es5 -m amd --pretty', 'typescript amd/es5');
    // execSync(typescriptPath + ' -outDir lib-es6 -t es6 -m es6 --pretty', 'typescript es6');
  }
};