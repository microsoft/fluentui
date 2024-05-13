/* eslint-disable no-undef */
/**
 * Utility for cleaning directories.
 * Usage: node build/clean.js %path%
 */
import * as path from 'path';
import * as fsPromises from 'node:fs/promises';
import yargs from 'yargs';

main();

/**
 * Function to remove a given path
 */
function cleanPath(cleanPath) {
  const removePath = path.resolve(process.cwd(), cleanPath);

  const result = fsPromises.rm(removePath, { recursive: true }).then(() => {
    console.log(removePath, 'cleaned');
  });

  return result;
}

function main() {
  const argv = yargs.argv;

  /**
   * All paths passed to the clean script
   */
  const paths = argv._;

  /**
   * Clean all paths
   */
  if (!Array.isArray(paths)) {
    throw new Error('"paths" must be an array');
  }

  const result = paths.map(cleanPath);

  Promise.all(result)
    .then(() => {
      console.log('All paths cleaned');
    })
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}
