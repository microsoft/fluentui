const path = require('path');
const { registerTsProject } = require('nx/src/utils/register');

registerTsProject(path.join(__dirname, '..'), 'tsconfig.lib.json');

/**
 * @typedef {import('./index').Config} Config
 */

module.exports = require('./index');
