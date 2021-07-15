const { emptyDiff } = require('./compareResultsInReports');
const getChangedEntriesInReport = require('./getChangedEntriesInReport');

describe('getChangedEntriesInReport', () => {
  it('splits entries to changed an unchanged', () => {
    /** @type {import('../utils/compareResultsInReports').ComparedReport} */
    const report = [
      { packageName: 'abc', name: 'abc-a', path: 'abc-a.js', minifiedSize: 0, gzippedSize: 0, diff: emptyDiff },
      {
        packageName: 'abc',
        name: 'abc-b',
        path: 'abc-b.js',
        minifiedSize: 0,
        gzippedSize: 0,
        diff: {
          empty: false,

          minified: { delta: 0, percent: '0%' },
          gzip: { delta: 0, percent: '0%' },
        },
      },
      { packageName: 'xyz', name: 'xyz', path: 'xyz.js', minifiedSize: 0, gzippedSize: 0, diff: emptyDiff },
    ];
    const actual = getChangedEntriesInReport(report);

    expect(actual.changedEntries).toHaveLength(2);
    expect(actual.changedEntries[0]).toEqual(report[0]);
    expect(actual.changedEntries[1]).toEqual(report[2]);

    expect(actual.unchangedEntries).toHaveLength(1);
    expect(actual.unchangedEntries[0]).toEqual(report[1]);
  });
});
