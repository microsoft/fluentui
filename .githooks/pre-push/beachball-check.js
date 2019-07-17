#!/usr/bin/env node

/**
 * Before we push to a remote branch, we will verify that the change files are actually checked in.
 * This saves the build time so that we would have a higher chance of having those change files before submitting for a build
 */

// Manually inserts a "check" command to the beachball CLI.js
// This avoids having to spawn a new process to complete the check, making it run faster
process.argv.push('check');
require('beachball/lib/cli');
