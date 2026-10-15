#!/usr/bin/env node

// @ts-check

const { cli } = require('../dist/cli');

cli().catch(err => {
  console.error(err);
  process.exit(1);
});
