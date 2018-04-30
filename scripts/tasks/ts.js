module.exports = function (options) {
  const path = require('path');
  const exec = require('../exec');
  const typescriptPath = 'node ' + path.resolve(__dirname, '../node_modules/typescript/lib/tsc');
  const libPath = path.resolve(process.cwd(), 'lib');
  const srcPath = path.resolve(process.cwd(), 'src');
  const extraParams = '--pretty' + (options.isProduction ? ` --inlineSources --sourceRoot ${path.relative(libPath, srcPath)}` : '');

  return Promise.all([
    exec(typescriptPath + ' -outDir lib -t es5 -m commonjs ' + extraParams)
      .then(() => console.log(`- TS: 'lib' done!`)),
    exec(typescriptPath + ' -outDir lib-es2015 -t es5 -m es2015 ' + extraParams)
      .then(() => console.log(`- TS: 'lib-es2015' done!`)),
    options.isProduction ? exec(typescriptPath + ' -outDir lib-amd -t es5 -m amd ' + extraParams)
      .then(() => console.log(`- TS: 'amd' done!`)) : Promise.resolve(),
  ]);
};