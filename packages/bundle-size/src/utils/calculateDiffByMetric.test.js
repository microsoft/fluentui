const calculateDiffByMetric = require('./calculateDiffByMetric');

describe('calculateDiffByMetric', () => {
  it('calculates difference deltas and percents', () => {
    /** @type {import("../utils/collectLocalReport").BundleSizeReportEntry} */
    const remoteEntry = {
      packageName: 'test-package',
      name: 'Test',
      path: 'test.fixture.js',
      minifiedSize: 1000,
      gzippedSize: 100,
    };
    /** @type {import("../utils/collectLocalReport").BundleSizeReportEntry} */
    const localEntry = {
      packageName: 'test-package',
      name: 'Test',
      path: 'test.fixture.js',
      minifiedSize: 1500,
      gzippedSize: 150,
    };

    expect(calculateDiffByMetric(localEntry, remoteEntry, 'minifiedSize')).toMatchInlineSnapshot(`
      Object {
        "delta": 500,
        "percent": "50%",
      }
    `);
    expect(calculateDiffByMetric(localEntry, remoteEntry, 'gzippedSize')).toMatchInlineSnapshot(`
      Object {
        "delta": 50,
        "percent": "50%",
      }
    `);
  });
});
