const { Extractor } = require('@microsoft/api-extractor');

module.exports = function(options) {
  // This interface represents the API Extractor config file contents
  const config = {
    compiler: {
      configType: 'tsconfig',
      rootFolder: process.cwd()
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
  const apiOptions = {
    // Indicates that API Extractor is running as part of a local build,
    // e.g. on developer's machine. For example, if the *.api.ts output file
    // has differences, it will be automatically overwritten for a
    // local build, whereas this should report an error for a production build.
    localBuild: options && options.args && options.args.indexOf('--debug') >= 0
  };

  const extractor = new Extractor(config, apiOptions);
  extractor.analyzeProject();
};
