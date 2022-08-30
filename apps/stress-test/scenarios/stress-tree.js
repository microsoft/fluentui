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
      minBreath: 1,
      maxBreadth: 10,
      minDepth: 1,
      maxDepth: 10,
      addBreadth: 10,
      addDepth: 10,
      removeBreadth: 9,
      removeDepth: 9,
    },

    s: {
      minBreath: 2,
      maxBreadth: 25,
      minDepth: 2,
      maxDepth: 25,
      addBreadth: 25,
      addDepth: 25,
      removeBreadth: 23,
      removeDepth: 23,
    },

    m: {
      minBreath: 3,
      maxBreadth: 150,
      minDepth: 3,
      maxDepth: 150,
      addBreadth: 150,
      addDepth: 150,
      removeBreadth: 147,
      removeDepth: 147,
    },

    l: {
      minBreath: 4,
      maxBreadth: 300,
      minDepth: 4,
      maxDepth: 300,
      addBreadth: 300,
      addDepth: 300,
      removeBreadth: 296,
      removeDepth: 296,
    },

    xl: {
      minBreath: 100,
      maxBreadth: 500,
      minDepth: 100,
      maxDepth: 500,
      addBreadth: 500,
      addDepth: 500,
      removeBreadth: 101,
      removeDepth: 101,
    },
  },
};
