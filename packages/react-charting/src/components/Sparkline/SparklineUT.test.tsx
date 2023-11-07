/* eslint-disable import/no-absolute-path */
export {};
describe('unit test', () => {
  test('UT 1', () => {
    const rewire = require('rewire');
    const ChartRewired = rewire('./SparklineBase.js');
    const result = ChartRewired.__get__('SparklineBase.prototype._test')();
    expect(result).toEqual(100);
  });
});
