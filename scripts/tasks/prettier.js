// @ts-check

const { runPrettierForProject } = require('../prettier/prettier-helpers');

module.exports = function() {
  runPrettierForProject(process.cwd());
};
