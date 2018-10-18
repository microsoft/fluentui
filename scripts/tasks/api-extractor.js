module.exports = function(options) {
  const path = require('path');
  const fs = require('fs');
  const resolve = require('resolve');
  const exec = require('../exec-sync');

  const apiConfigPath = path.join(process.cwd(), 'config', 'api-extractor.json');

  if (fs.existsSync(apiConfigPath)) {
    const apiExtractorPath = resolve.sync('@microsoft/api-extractor/bin/api-extractor');
    const customArgs = options.args || '';
    exec(`node ${apiExtractorPath} run --config ${apiConfigPath} ${customArgs}`);
  } else {
    console.log('No api-extractor config file found at ' + apiConfigPath);
  }
};
