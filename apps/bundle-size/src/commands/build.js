// @ts-check

const chalk = require('chalk');
const Table = require('cli-table3');
const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const prettyBytes = require('pretty-bytes');

const buildFixture = require('../utils/buildFixture');
const { hrToSeconds } = require('../utils/helpers');
const prepareFixture = require('../utils/prepareFixture');

/**
 * @param {{ verbose: boolean }} options
 */
async function build(options) {
  const { verbose } = options;

  const startTime = process.hrtime();
  const artifactsDir = path.resolve(process.cwd(), 'dist', 'bundle-size');

  await fs.remove(artifactsDir);

  if (verbose) {
    console.log(`${chalk.blue('[i]')} artifacts dir is cleared`);
  }

  const fixtures = glob.sync('bundle-size/*.fixture.js', {
    cwd: process.cwd(),
  });

  if (verbose) {
    console.log(`${chalk.blue('[i]')} Measuring bundle size for ${fixtures.length} fixture(s)...`);
    console.log(fixtures.map(fixture => `  - ${fixture}`).join('\n'));
  }

  const preparedFixtures = await Promise.all(fixtures.map(prepareFixture));
  const measurements = [];

  for (const preparedFixture of preparedFixtures) {
    measurements.push(await buildFixture(preparedFixture, verbose));
  }

  measurements.sort((a, b) => a.path.localeCompare(b.path));

  await fs.writeJSON(path.resolve(process.cwd(), 'dist', 'bundle-size', 'bundle-size.json'), measurements);

  if (verbose) {
    const table = new Table({
      head: ['Fixture', 'Minified size', 'GZIP size'],
    });

    measurements.forEach(r => {
      table.push([r.name, prettyBytes(r.minifiedSize), prettyBytes(r.gzippedSize)]);
    });

    console.log(table.toString());
    console.log(`Completed in ${hrToSeconds(process.hrtime(startTime))}`);
  }
}

// ---

exports.command = 'build';
exports.desc = 'builds bundle size fixtures and generates JSON report';
exports.handler = build;
