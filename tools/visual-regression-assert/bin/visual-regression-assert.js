#!/usr/bin/env node

// @ts-check

// TODO: we need SWC in memory transpile as TSC doesn't support ignoring dynamic import during transpilation which is crucial for CJS module that needs to consume ESM ( in our case pixelmatch )
// ===================================================================
// const { join } = require('node:path');
// const { registerTsProject } = require('@nx/js/src/internal');
// registerTsProject(join(__dirname, '../tsconfig.lib.json'));
// require('../src/cli');

require('../dist/src/cli');
