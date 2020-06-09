// @ts-check

const { runPrettier } = require('../prettier/prettier-helpers');

const files = process.argv.slice(2);
runPrettier(files);
