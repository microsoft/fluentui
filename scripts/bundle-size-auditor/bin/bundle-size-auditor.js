#!/usr/bin/env node

const path = require('path');
const { registerTsProject } = require('nx/src/utils/register');

registerTsProject(path.join(__dirname, '..'), 'tsconfig.lib.json');

const { cli } = require('../src/cli');
cli().catch(err => {
  console.error(err);
  process.exit(1);
});
