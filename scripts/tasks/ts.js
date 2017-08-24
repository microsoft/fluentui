module.exports = function (options) {
  const path = require('path');
  const execSync = require('../exec-sync');
  const typescriptPath = 'node ' + path.resolve(__dirname, '../node_modules/typescript/lib/tsc');

  execSync(typescriptPath + ' -outDir lib -t es5 -m commonjs --pretty');

  if (options.isProduction) {
    execSync(typescriptPath + ' -outDir lib-amd -t es5 -m amd --pretty');
    // execSync(typescriptPath + ' -outDir lib-es6 -t es6 -m es6 --pretty', 'typescript es6');
  }
};