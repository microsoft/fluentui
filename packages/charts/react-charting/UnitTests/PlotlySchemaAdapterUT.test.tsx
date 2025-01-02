import React from 'react';
import {
  isDateArray,
  isNumberArray,
  isMonthArray,
  updateXValues,
  getColor,
} from '../src/components/DeclarativeChart/PlotlySchemaAdapter';

const env = require('../config/tests');
const runTest = env === 'TEST' ? describe : describe.skip;

describe('isDate', () => {
  test('Should return true when input array contains Date objects', () => {
    var date = new Date();
    expect(isDateArray([date, date.getDate() + 1, date.getDate() + 2])).toBe(true);
  });

  test('Should return false when input array contains numeric data', () => {
    expect(isDateArray([20, 30, 40])).toBe(false);
  });

  test('Should return false when input array contains string data', () => {
    expect(isDateArray(['twenty', 'thirty', 'forty'])).toBe(false);
  });
});

describe('isNumberArray', () => {
  test('Should return false when input array contains Date objects', () => {
    var date = new Date();
    expect(isNumberArray([date, date.getDate() + 1, date.getDate() + 2])).toBe(false);
  });

  test('Should return true when input array contains numeric data', () => {
    expect(isNumberArray([20, 30, 40])).toBe(true);
  });

  test('Should return true when input array contains numaric data in string formatt', () => {
    expect(isNumberArray(['20', '30', '40'])).toBe(true);
  });

  test('Should return false when input array contains string data', () => {
    expect(isNumberArray(['twenty', 'thirty', 'forty'])).toBe(false);
  });
});

describe('isMonthArray', () => {
  test('Should return false when input array contains Date objects', () => {
    var date = new Date();
    expect(isMonthArray([date, date.getDate() + 1, date.getDate() + 2])).toBe(false);
  });

  test('Should return true when input array contains months data', () => {
    expect(isMonthArray([10, 11, 1])).toBe(true);
  });

  test('Should return false when input array contains numeric data(apart from months 1 to 12)', () => {
    expect(isMonthArray([20, 30, 40])).toBe(false);
  });

  test('Should return false when input array contains numaric data in string formatt', () => {
    expect(isMonthArray(['20', '30', '40'])).toBe(false);
  });

  test('Should return false when input array contains string data', () => {
    expect(isMonthArray(['One', 'Two', 'Three'])).toBe(false);
  });
});

describe('updateXValues', () => {
  test('Should return true when input array contains months data', () => {
    expect(updateXValues([10, 11, 1])).toStrictEqual(['10 01, 2024', '11 01, 2024', '1 01, 2025']);
  });

  // test('Should return true when input array contains months data', () => {
  //   var date = new Date();
  //   expect(updateXValues([10, 11, 16])).toStrictEqual(['10 01, 2024', '11 01, 2024', '1 01, 2025']);
  // });
});

describe('getColor', () => {
  test('Should return true when input array contains months data', () => {
    const colorMap = new Map<string, string>();
    expect(getColor('test', { current: colorMap }, true)).toBe('#e3008c');
  });
});
