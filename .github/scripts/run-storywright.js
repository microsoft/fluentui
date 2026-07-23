#!/usr/bin/env node
// Cross-platform wrapper for storywright VR runs.
//
// Usage:
//   node run-storywright.js <EXCLUDE_ENV_VAR> [--] [storywright args...]
//
// If <EXCLUDE_ENV_VAR> is set in the environment, --excludePatterns <value>
// is appended to the storywright args. This replaces the POSIX-only
// ${VAR:+--excludePatterns "$VAR"} shell expansion that fails on Windows.

'use strict';

const { spawnSync } = require('node:child_process');

const argv = process.argv.slice(2);
const separatorIdx = argv.indexOf('--');

const envVarName = argv[0];
const storyWrightArgs = separatorIdx >= 0 ? argv.slice(separatorIdx + 1) : argv.slice(1);

const excludePatterns = envVarName ? process.env[envVarName] : undefined;
if (excludePatterns) {
  storyWrightArgs.push('--excludePatterns', excludePatterns);
}

const result = spawnSync('yarn', ['run', '-T', 'storywright', ...storyWrightArgs], {
  stdio: 'inherit',
  shell: false,
});

process.exitCode = result.status ?? 1;
