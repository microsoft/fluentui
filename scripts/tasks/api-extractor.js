// @ts-check

const path = require('path');
const { argv, apiExtractorVerifyTask, apiExtractorUpdateTask } = require('just-scripts');

const configPath = path.resolve(process.cwd(), argv().configPath || 'config/api-extractor.json');

exports.verifyApiExtractor = apiExtractorVerifyTask(configPath, undefined);
exports.updateApiExtractor = apiExtractorUpdateTask(configPath, undefined);
