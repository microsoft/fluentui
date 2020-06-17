// @ts-check

const fs = require('fs');
const path = require('path');
const { argv, apiExtractorVerifyTask, apiExtractorUpdateTask } = require('just-scripts');

const configPath = path.resolve(process.cwd(), argv().configPath || 'config/api-extractor.json');

function verifyApiExtractor() {
  const configFolder = path.resolve(process.cwd(), 'config');
  const done = () => {};

  fs.readdirSync(configFolder).forEach(fileName => {
    if (fileName.match(/^api-extractor(-[a-zA-Z]+)?\.json$/)) {
      // @ts-ignore
      apiExtractorVerifyTask(path.resolve(configFolder, fileName), undefined)(done);
    }
  });
}
const updateApiExtractor = apiExtractorUpdateTask(configPath, undefined);

module.exports = { verifyApiExtractor, updateApiExtractor };
