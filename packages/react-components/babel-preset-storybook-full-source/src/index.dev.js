// This is internal code and should be a dev dependency
/* eslint-disable import/no-extraneous-dependencies */
const { registerTsProject } = require('nx/src/utils/register');

// This is internal code and should be a dev dependency
const { workspaceRoot } = require('@nrwl/devkit');
/* eslint-enable import/no-extraneous-dependencies */

registerTsProject(workspaceRoot, 'tsconfig.base.json');

module.exports = require('./index.ts');
