module.exports = function (options) {
  const path = require('path');
  const fs = require('fs');
  const configPath = path.resolve(process.cwd(), 'config/api-extractor.js');
  const isVerbose = process.argv.indexOf('--verbose') >= 0;

  if (fs.existsSync(configPath)) {
    const { Extractor } = require('@microsoft/api-extractor');
    const config = require(configPath);
    const options = {
      localBuild: process.argv.indexOf('--production') < 0,
      customLogger: {
        logVerbose: (message) => {
          if (isVerbose) {
            console.log(message);
          }
        }
      }
    };
    const extractor = new Extractor(config, options);

    extractor.analyzeProject();
  }
};
