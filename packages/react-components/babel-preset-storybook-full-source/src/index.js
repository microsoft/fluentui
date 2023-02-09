// This is internal code and should be a dev dependency
// eslint-disable-next-line import/no-extraneous-dependencies
const { registerTsProject } = require('nx/src/utils/register');

// This is internal code and should be a dev dependency
// eslint-disable-next-line import/no-extraneous-dependencies
const { workspaceRoot } = require('@nrwl/devkit');

registerTsProject(workspaceRoot, 'tsconfig.base.json');

module.exports = require('./index.ts');
