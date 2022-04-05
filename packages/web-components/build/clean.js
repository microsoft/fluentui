/**
 * Utility for cleaning directories.
 * Usage: node build/clean.js %path%
 */
const path = require('path');
const rimraf = require('rimraf');
const argv = require('yargs').argv;

/**
 * All paths passed to the clean script
 */
const paths = argv._;

/**
 * Function to remove a given path
 */
function cleanPath(cleanPath) {
  const removePath = path.resolve(process.cwd(), cleanPath);
  rimraf(removePath, () => {
    console.log(removePath, 'cleaned');
  });
}

/**
 * Clean all paths
 */
if (Array.isArray(paths)) {
  paths.forEach(cleanPath);
}
