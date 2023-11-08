/* eslint-disable import/no-absolute-path */
import * as fs from 'fs';

describe('unit test', () => {
  test('UT 1', () => {
    const rewire = require('rewire');
    const ChartRewired = rewire('./SparklineBase.js');
    const result = ChartRewired.__get__('SparklineBase.prototype._test')();
    expect(result).toEqual(100);
  });
});

// Delete the js file
fs.unlink('./SparklineBase.js', err => {
  if (err) {
    console.error(`Error deleting file: ${err}`);
  } else {
    console.log('File deleted successfully!');
  }
});
