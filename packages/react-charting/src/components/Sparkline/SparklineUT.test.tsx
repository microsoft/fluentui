/* eslint-disable import/no-absolute-path */

describe('unit test', () => {
  test('UT 1', () => {
    const rewire = require('rewire');
    const ChartRewired = rewire('D:/fluentui/packages/react-charting/src/components/Sparkline/SparklineUpdated.js');
    const result = ChartRewired.__get__('SparklineBase.prototype._test')();
    expect(result).toEqual(100);
  });
});
