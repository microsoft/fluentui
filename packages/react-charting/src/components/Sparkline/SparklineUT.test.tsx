/* eslint-disable import/no-absolute-path */
import * as fs from 'fs';

describe('unit test', () => {
  test('UT 1', () => {
    const rewire = require('rewire');
    fs.access('src/components/Sparkline/SparklineBase.js', fs.constants.F_OK, err => {
      if (!err) {
        const ChartRewired = rewire('./SparklineBase.js');
        const result = ChartRewired.__get__('SparklineBase.prototype._test')();
        expect(result).toEqual(100);
      } else {
        setTimeout(() => {
          const ChartRewired = rewire('./SparklineBase.js');
          const result = ChartRewired.__get__('SparklineBase.prototype._test')();
          expect(result).toEqual(100);
        }, 5000);
      }
    });
  });
});

// Check if the js file exists
fs.access('./SparklineBase.js', fs.constants.F_OK, err => {
  if (!err) {
    // Delete the js file
    fs.unlink('./SparklineBase.js', err => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
      }
    });
  } else {
    setTimeout(() => {
      fs.unlink('./SparklineBase.js', err => {
        if (err) {
          console.error(`Error deleting file: ${err}`);
        }
      });
    }, 5000);
  }
});
