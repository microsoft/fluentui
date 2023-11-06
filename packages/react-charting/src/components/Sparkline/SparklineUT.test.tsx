/* eslint-disable import/no-absolute-path */
// import { SparklineBase } from './Sparkline.base';

// import { updateFile } from './script'
// updateFile();

describe('unit test', () => {
  // beforeAll(() => updateFile());
  test('UT 1', () => {
    const rewire = require('rewire');
    // const ChartRewired = rewire(
    //   'D:/fluentui/packages/react-charting/lib-commonjs/components/Sparkline/Sparkline.base',
    // );
    const ChartRewired = rewire('D:/fluentui/packages/react-charting/src/components/Sparkline/SparklineUpdated.js');
    const result = ChartRewired.__get__('SparklineBase.prototype._test')();
    expect(result).toEqual(100);
  });
});
