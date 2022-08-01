if (process.env.NODE_ENV === 'production') {
  module.exports = require('./preset.prod');
} else {
  const { appRootPath: workspaceRoot } = require('@nrwl/tao/src/utils/app-root');
  const { registerTsProject } = require('./register');
  registerTsProject(workspaceRoot, 'tsconfig.base.json');
  module.exports = require('./preset.dev');
}
