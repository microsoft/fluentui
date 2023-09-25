/** @typedef {import('./types').LernaUtils} LernaUtils */
/** @typedef {import('./types').ProjectGraphWithPackages} ProjectGraphWithPackages */

// @ts-ignore - lerna is not shipping types
const utils = /** @type {LernaUtils} */ (require('lerna/utils'));

exports.utils = utils;
