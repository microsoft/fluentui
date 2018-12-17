const { apiExtractorVerifyTask, apiExtractorUpdateTask } = require('just-task-preset');
exports.apiExtractor = apiExtractorVerifyTask();
exports.updateApi = apiExtractorUpdateTask();
