const { emptyDiff } = require('./compareResultsInReports');
const sortComparedReport = require('./sortComparedReport');

describe('sortComparedReport', () => {
  it('sorts a report by "packageName" & "path', () => {
    /** @type {import('../utils/compareResultsInReports').ComparedReport} */
    const report = [
      { packageName: 'bcd', name: 'BCD-B', path: 'bcd-b.js', minifiedSize: 0, gzippedSize: 0, diff: emptyDiff },
      { packageName: 'bcd', name: 'BCD-A', path: 'bcd-a.js', minifiedSize: 0, gzippedSize: 0, diff: emptyDiff },
      { packageName: 'abc', name: 'ABC', path: 'abc.js', minifiedSize: 0, gzippedSize: 0, diff: emptyDiff },
    ];

    expect(sortComparedReport(report).map(({ packageName, path }) => ({ packageName, path }))).toMatchInlineSnapshot(`
      Array [
        Object {
          "packageName": "abc",
          "path": "abc.js",
        },
        Object {
          "packageName": "bcd",
          "path": "bcd-a.js",
        },
        Object {
          "packageName": "bcd",
          "path": "bcd-b.js",
        },
      ]
    `);
  });
});
