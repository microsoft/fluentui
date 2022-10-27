/**
 * @typedef {Object} TestOptions
 * @property {number} numStartNodes
 * @property {number} numAddNodes
 * @property {number} numRemoveNodes
 */

/**
 * @typedef {Object.<string, TestOptions>} SizeMap
 */

/**
 * @typedef {Object} ScenarioConfig
 * @property {string[]} [testCases]
 * @property {SizeMap} [sizes]
 * @property {string[]} [browsers]
 * @property {number} [sampleSize]
 * @property {string[]} [targets]
 */

module.exports = {
  testCases: ['mount', 'inject-styles', 'prop-update', 'remove-node', 'add-node'],

  sizes: {
    xs: {
      numStartNodes: 100,
      numAddNodes: 100,
      numRemoveNodes: 99,
    },

    s: {
      numStartNodes: 250,
      numAddNodes: 250,
      numRemoveNodes: 249,
    },

    m: {
      numStartNodes: 500,
      numAddNodes: 500,
      numRemoveNodes: 499,
    },

    l: {
      numStartNodes: 750,
      numAddNodes: 750,
      numRemoveNodes: 749,
    },

    xl: {
      numStartNodes: 1000,
      numAddNodes: 1000,
      numRemoveNodes: 999,
    },
  },
};
