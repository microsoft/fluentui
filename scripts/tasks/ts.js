module.exports = function(options) {
  options = options || {};
  options.commonjsOnly = options.commonjsOnly || process.argv.indexOf('--commonJsOnly') > -1;

  const path = require('path');
  const exec = require('../exec');
  const typescriptPath = 'node ' + require.resolve('typescript/lib/tsc');
  const libPath = path.resolve(process.cwd(), 'lib');
  const srcPath = path.resolve(process.cwd(), 'src');
  const extraParams = '--pretty' + (options.isProduction ? ` --inlineSources --sourceRoot ${path.relative(libPath, srcPath)}` : '');

  // Flag to keep track of if we already logged errors.
  // Since we run the ts builds in parallel, we do not want
  // to flood the user with the same error messages for
  // each process.
  let hasLoggedErrors = false;

  // We wait for all compilations to be done to report success
  const runPromises = [];

  if (options.commonjsOnly) {
    runPromises.push(runTscFor('lib', 'commonjs', extraParams));
  } else {
    runPromises.push(runTscFor('lib-commonjs', 'commonjs', extraParams));
    runPromises.push(runTscFor('lib', 'es2015', extraParams));
  }

  if (options.isProduction) {
    runPromises.push(runTscFor('lib-amd', 'amd', extraParams));
  }

  return Promise.all(runPromises);

  function logFirstStdOutAndRethrow(process) {
    if (!hasLoggedErrors) {
      hasLoggedErrors = true;
      console.log(process.stdout.toString('utf8'));
    }
    return Promise.reject(process);
  }

  function logSuccessFor(target) {
    return () => console.log(`- TS: '${target}' done!`);
  }

  function runTscFor(outDir, moduleType, extraParams) {
    return exec(typescriptPath + ` -outDir ${outDir} -t es5 -m ${moduleType} ` + extraParams).then(
      logSuccessFor(outDir),
      logFirstStdOutAndRethrow
    );
  }
};
