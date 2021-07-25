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

    const actual = compareResultsInReports(localReport, remoteReport);
    const packageAbcReport = {
      fileAbcA: actual[0],
      fileAbcB: actual[1],
    };
    const packageXyzReport = actual[2];

    expect(packageAbcReport.fileAbcA).toMatchInlineSnapshot(`
      Object {
        "diff": Object {
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
        "gzippedSize": 5,
        "minifiedSize": 10,
        "name": "abc-a",
        "packageName": "abc",
        "path": "abc-b.js",
      }
    `);
    expect(packageAbcReport.fileAbcB).toMatchInlineSnapshot(`
      Object {
        "diff": Object {
          "empty": true,
          "gzip": Object {
            "delta": 1,
            "percent": "100%",
          },
          "minified": Object {
            "delta": 1,
            "percent": "100%",
          },
        },
        "gzippedSize": 5,
        "minifiedSize": 10,
        "name": "abc-b",
        "packageName": "abc",
        "path": "abc-a.js",
      }
    `);
    expect(packageXyzReport).toMatchInlineSnapshot(`
      Object {
        "diff": Object {
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
        "gzippedSize": 5,
        "minifiedSize": 10,
        "name": "xyz",
        "packageName": "xyz",
        "path": "xyz.js",
      }
    `);
  });
});
