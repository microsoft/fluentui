#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

if (!fs.existsSync(path.resolve(__dirname, '../node_modules/lint-staged'))) {
  console.error('lint-staged is not installed. Please run `yarn` then try again.');
  process.exit(1);
} else if (!fs.existsSync(path.resolve(__dirname, '../node_modules/lint-staged/bin/lint-staged.js'))) {
  // If someone updates from master but doesn't run yarn, by default they'd be unable to commit
  // with some cryptic error. Explicitly detect that condition and show a helpful error.
  console.error('lint-staged version is out of date! Please run `yarn` to update dependencies.');
  process.exit(1);
}

require('lint-staged/bin/lint-staged.js');
