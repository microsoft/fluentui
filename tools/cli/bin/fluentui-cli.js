#!/usr/bin/env node

// @ts-check

const { handleFatalError, main } = require('../dist/src/cli');

const argv = process.argv.slice(2);
main(argv).catch(error => handleFatalError(error, argv));
