module.exports = function (options) {
  const path = require('path');
  const execSync = require('../exec-sync');
  const typescriptPath = 'node ' + path.resolve(__dirname, '../node_modules/typescript/lib/tsc');

  const extraParams = '--pretty' + (options.isProduction ? ' --inlineSources --mapRoot ../src' : '');
  execSync(typescriptPath + ' -outDir lib -t es5 -m commonjs ' + extraParams);

  if (options.isProduction) {
    execSync(typescriptPath + ' -outDir lib-amd -t es5 -m amd ' + extraParams);
    // execSync(typescriptPath + ' -outDir lib-es6 -t es6 -m es6 ' + extraParams, 'typescript es6');
  }
};