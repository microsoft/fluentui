// This is internal code and should be a dev dependency
/* eslint-disable import/no-extraneous-dependencies */
const { registerTsProject } = require('nx/src/utils/register');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
registerTsProject(projectRoot, 'tsconfig.lib.json');

module.exports = require('./index.ts');
