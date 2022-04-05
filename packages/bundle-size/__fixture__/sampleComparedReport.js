const { emptyDiff } = require('../src/utils/compareResultsInReports');

/** @type {import('../src/utils/compareResultsInReports').ComparedReport} */
const sampleComparedReport = [
  {
    packageName: 'foo-package',
    name: 'New entry',
    path: 'foo.fixture.js',
    minifiedSize: 1000,
    gzippedSize: 100,
    diff: emptyDiff,
  },
  {
    packageName: 'bar-package',
    name: 'An entry without diff',
    path: 'bar.fixture.js',
    minifiedSize: 1000,
    gzippedSize: 100,
    diff: {
      empty: false,

      minified: { delta: 0, percent: '0%' },
      gzip: { delta: 0, percent: '0%' },
    },
  },
  {
    packageName: 'baz-package',
    name: 'An entry with diff',
    path: 'baz.fixture.js',
    minifiedSize: 1000,
    gzippedSize: 100,
    diff: {
      empty: false,

      minified: { delta: 1000, percent: '100%' },
      gzip: { delta: 100, percent: '100%' },
    },
  },
];

module.exports = sampleComparedReport;
