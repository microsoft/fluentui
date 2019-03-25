// @ts-check

const path = require('path');
const readConfig = require('../read-config');
const { apiExtractorVerifyTask, apiExtractorUpdateTask } = require('just-scripts');

const configPath = path.resolve(process.cwd(), 'config/api-extractor.json');
const config = readConfig(configPath) || {};

exports.verifyApiExtractor = apiExtractorVerifyTask(config, undefined);
exports.updateApiExtractor = apiExtractorUpdateTask(config, undefined);
