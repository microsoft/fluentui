// @ts-check

const { runPrettierForFolder } = require('../prettier/prettier-helpers');

module.exports = function() {
  runPrettierForFolder(process.cwd(), true);
};
