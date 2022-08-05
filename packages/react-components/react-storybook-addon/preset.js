if (process.env.NODE_ENV === 'production') {
  module.exports = require('./preset.prod');
} else {
  const { workspaceRoot } = require('nx/src/utils/app-root');
  const { registerTsProject } = require('nx/src/utils/register');

  registerTsProject(workspaceRoot, 'tsconfig.base.json');
  module.exports = require('./preset.dev');
}
