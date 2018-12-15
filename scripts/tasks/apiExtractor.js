const { apiExtractorVerifyTask, apiExtractorUpdateTask } = require('just-task-preset');
exports.apiExtractor = {
  update: apiExtractorUpdateTask(),
  verify: apiExtractorVerifyTask()
};
