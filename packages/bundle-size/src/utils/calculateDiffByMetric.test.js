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

    expect(calculateDiffByMetric(localEntry, remoteEntry, 'minifiedSize')).toEqual({
      delta: 500,
      percent: '50%',
    });
    expect(calculateDiffByMetric(localEntry, remoteEntry, 'gzippedSize')).toEqual({
      delta: 50,
      percent: '50%',
    });
  });

  it('handles zero values', () => {
    /** @type {import("../utils/collectLocalReport").BundleSizeReportEntry} */
    const remoteEntry = {
      packageName: 'test-package',
      name: 'Test',
      path: 'test.fixture.js',
      minifiedSize: 0,
      gzippedSize: 0,
    };
    /** @type {import("../utils/collectLocalReport").BundleSizeReportEntry} */
    const localEntry = {
      packageName: 'test-package',
      name: 'Test',
      path: 'test.fixture.js',
      minifiedSize: 0,
      gzippedSize: 0,
    };

    expect(calculateDiffByMetric(localEntry, remoteEntry, 'minifiedSize')).toEqual({
      delta: 0,
      percent: '0%',
    });
    expect(calculateDiffByMetric(localEntry, remoteEntry, 'gzippedSize')).toEqual({
      delta: 0,
      percent: '0%',
    });
  });
});
