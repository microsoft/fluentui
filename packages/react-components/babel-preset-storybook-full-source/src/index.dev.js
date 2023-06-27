// This is internal code and should be a dev dependency
/* eslint-disable import/no-extraneous-dependencies */
const { registerTsProject } = require('nx/src/utils/register');

// This is internal code and should be a dev dependency
const { joinPathFragments } = require('@nrwl/devkit');
/* eslint-enable import/no-extraneous-dependencies */

registerTsProject(joinPathFragments(__dirname, '..'), 'tsconfig.lib.json');

module.exports = require('./index.ts');
