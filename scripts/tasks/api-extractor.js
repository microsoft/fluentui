// @ts-check

const path = require('path');
const { apiExtractorVerifyTask, apiExtractorUpdateTask } = require('just-scripts');

const configPath = path.resolve(process.cwd(), 'config/api-extractor.json');

exports.verifyApiExtractor = apiExtractorVerifyTask({ configJsonFilePath: configPath, fixNewlines: true });
exports.updateApiExtractor = apiExtractorUpdateTask({ configJsonFilePath: configPath, fixNewlines: true });
