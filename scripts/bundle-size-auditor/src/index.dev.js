// @ts-check

const { joinPathFragments } = require('@nx/devkit');
const { registerTsProject } = require('@nx/js/src/internal');

registerTsProject(joinPathFragments(__dirname, '..', 'tsconfig.lib.json'));

/**
 * @typedef {import('./index').Config} Config
 */

module.exports = require('./index');
