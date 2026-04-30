#!/usr/bin/env node

// @ts-check

if (process.env.NODE_ENV !== 'production') {
  const { joinPathFragments } = require('@nx/devkit');
  const { registerTsProject } = require('@nx/js/src/internal');
  registerTsProject(joinPathFragments(__dirname, '..', 'tsconfig.lib.json'));
}

const { cli } = process.env.NODE_ENV !== 'production' ? require('../src/cli') : require('../dist/src/cli');

cli().catch(err => {
  console.error(err);
  process.exit(1);
});
