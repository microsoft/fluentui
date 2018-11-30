module.exports = function(options) {
  const { Extractor } = require('@microsoft/api-extractor');

  // This interface represents the API Extractor config file contents
  const config = {
    compiler: {
      configType: 'tsconfig',
      rootFolder: './'
    },
    policies: {
      namespaceSupport: 'conservative'
    },
    project: {
      entryPointSourceFile: 'lib/index.d.ts'
    },
    validationRules: {
      missingReleaseTags: 'allow'
    }
  };

  // This interface provides additional runtime state
  // that is NOT part of the config file
  const extractorOptions = {
    localBuild: options.args && options.args.indexOf('--local') >= 0
  };

  const extractor = new Extractor(config, extractorOptions);
  const success = extractor.processProject();

  if (success) {
    return Promise.resolve();
  }

  // Logging is temporary for debugging the CI build and should not be checked in.
  console.log('API Extractor build task failed - rejecting promise');
  return Promise.reject('The public API file is out of date. Please run "npm run update-api" and commit the updated API file.');
};
