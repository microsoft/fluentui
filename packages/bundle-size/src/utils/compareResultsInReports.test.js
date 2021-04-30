const { compareResultsInReports } = require('./compareResultsInReports');

describe('compareResultsInReports', () => {
  it('compares local and remote reports', () => {
    /** @type {import("./collectLocalReport").BundleSizeReport} */
    const localReport = [
      { packageName: 'abc', name: 'abc-a', path: 'abc-b.js', minifiedSize: 10, gzippedSize: 5 },
      { packageName: 'abc', name: 'abc-b', path: 'abc-a.js', minifiedSize: 10, gzippedSize: 5 },
      { packageName: 'xyz', name: 'xyz', path: 'xyz.js', minifiedSize: 10, gzippedSize: 5 },
    ];
    /** @type {import("./collectLocalReport").BundleSizeReport}  */
    const remoteReport = [
      { packageName: 'abc', name: 'abc-a', path: 'abc-b.js', minifiedSize: 12, gzippedSize: 7 },
      { packageName: 'xyz', name: 'xyz', path: 'xyz.js', minifiedSize: 10, gzippedSize: 5 },
    ];

    expect(compareResultsInReports(localReport, remoteReport).map(entry => entry.diff)).toMatchInlineSnapshot(`
      Array [
        Object {
          "empty": false,
          "gzip": Object {
            "delta": -2,
            "percent": "-28.6%",
          },
          "minified": Object {
            "delta": -2,
            "percent": "-16.7%",
          },
        },
        Object {
          "empty": true,
          "gzip": Object {
            "delta": Infinity,
            "percent": "100%",
          },
          "minified": Object {
            "delta": Infinity,
            "percent": "100%",
          },
        },
        Object {
          "empty": false,
          "gzip": Object {
            "delta": 0,
            "percent": "0%",
          },
          "minified": Object {
            "delta": 0,
            "percent": "0%",
          },
        },
      ]
    `);
  });
});
