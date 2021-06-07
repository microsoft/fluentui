const chalk = require('chalk');
const Table = require('cli-table3');
const fs = require('fs').promises;
const del = require('del');
const glob = require('glob');
const path = require('path');
const prettyBytes = require('pretty-bytes');

const buildFixture = require('../utils/buildFixture');
const { hrToSeconds } = require('../utils/helpers');
const prepareFixture = require('../utils/prepareFixture');

/**
 * @param {typeof import('../index')} options
 */
async function measure(options) {
  const { quiet } = options;

  const startTime = process.hrtime();
  const artifactsDir = path.resolve(process.cwd(), 'dist', 'bundle-size');

  await del(artifactsDir);

  if (!quiet) {
    console.log(`${chalk.blue('[i]')} artifacts dir is cleared`);
  }

  const fixtures = glob.sync('bundle-size/*.fixture.js', {
    cwd: process.cwd(),
  });

  if (!quiet) {
    console.log(`${chalk.blue('[i]')} Measuring bundle size for ${fixtures.length} fixture(s)...`);
    console.log(fixtures.map(fixture => `  - ${fixture}`).join('\n'));
  }

  const preparedFixtures = await Promise.all(fixtures.map(prepareFixture));
  const measurements = await Promise.all(preparedFixtures.map(preparedFixture => buildFixture(preparedFixture, quiet)));

  await fs.writeFile(
    path.resolve(process.cwd(), 'dist', 'bundle-size', 'bundle-size.json'),
    JSON.stringify(measurements),
  );

  if (!quiet) {
    const table = new Table({
      head: ['Fixture', 'Minified size', 'GZIP size'],
    });
    const sortedMeasurements = [...measurements].sort((a, b) => a.path.localeCompare(b.path));

    sortedMeasurements.forEach(r => {
      table.push([r.name, prettyBytes(r.minifiedSize), prettyBytes(r.gzippedSize)]);
    });

    console.log(table.toString());
    console.log(`Completed in ${hrToSeconds(process.hrtime(startTime))}`);
  }
}

// ---

/** @type {import('yargs').CommandModule} */
const api = {
  command: 'measure',
  describe: 'builds bundle size fixtures and generates JSON report',
  handler: measure,
};

module.exports = api;
