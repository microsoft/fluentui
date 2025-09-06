#!/usr/bin/env node

// @ts-check

const { joinPathFragments } = require('@nx/devkit');
const { registerTsProject } = require('@nx/js/src/internal');

registerTsProject(joinPathFragments(__dirname, '..', 'tsconfig.lib.json'));

const { cli } = require('../src/cli');

cli().catch(err => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
