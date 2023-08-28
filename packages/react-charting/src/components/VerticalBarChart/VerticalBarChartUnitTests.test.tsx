import { stringPoints } from './VerticalBarChartRTL.test';
import { DarkTheme } from '@fluentui/theme-samples';
import { chartPoints } from './VerticalBarChart.test';
import { testWithoutWait } from '../../utilities/TestUtility.test';
import * as utils from '@fluentui/react/lib/Utilities';
import { DefaultPalette } from '@fluentui/react';
import { VerticalBarChartBase } from './VerticalBarChart.base';
import { VerticalBarChart } from './VerticalBarChart';

describe('VerticalBarChart unit tests', () => {
  describe('Get domain margins', () => {
    test('Should return the correct margins when total width is greater than required width', () => {
      const instance = new VerticalBarChartBase({
        data: stringPoints,
        width: 1000,
        margins: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      });
      expect(instance).toBeDefined();
      const margins = instance.getDomainMargins();
      expect(margins).toBeDefined();
      expect(margins.left).toEqual(468);
      expect(margins.right).toEqual(468);
      expect(margins.top).toEqual(10);
      expect(margins.bottom).toEqual(10);
    });
    test('Should return the correct margins when total width is less than required width', () => {
      const instance = new VerticalBarChartBase({
        data: stringPoints,
        width: 50,
        margins: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      });
      expect(instance).toBeDefined();
      const margins = instance.getDomainMargins();
      expect(margins).toBeDefined();
      expect(margins.left).toEqual(18);
      expect(margins.right).toEqual(18);
      expect(margins.top).toEqual(10);
      expect(margins.bottom).toEqual(10);
    });
  });
  describe('Get scales', () => {
    it('Should return scales for numeric axis', () => {
      const instance = new VerticalBarChartBase({
        data: chartPoints,
        theme: DarkTheme,
        margins: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      });
      expect(instance).toBeDefined();
      const containerHeight = 500;
      const containerWidth = 800;
      const isNumericAxis = true;

      const scales = instance.getScales(containerHeight, containerWidth, isNumericAxis);

      expect(scales.xBarScale).toBeDefined();
      expect(scales.yBarScale).toBeDefined();
      expect(scales.xBarScale(-1000)).toBeLessThan(0);
      expect(scales.xBarScale(20000)).toBeLessThanOrEqual(containerWidth);
      expect(scales.xBarScale(40000)).toBeGreaterThan(containerWidth);
      expect(scales.yBarScale(-5000)).toBeLessThan(0);
      expect(scales.yBarScale(5000)).toBeLessThanOrEqual(containerHeight);
      expect(scales.yBarScale(60000)).toBeGreaterThan(containerHeight);
    });

    it('Should return scales for non-numeric axis', () => {
      const instance = new VerticalBarChartBase({
        data: stringPoints,
        theme: DarkTheme,
        margins: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      });
      expect(instance).toBeDefined();
      const containerHeight = 500;
      const containerWidth = 800;
      const isNumericAxis = false;
      const scales = instance.getScales(containerHeight, containerWidth, isNumericAxis);

      expect(scales.xBarScale).toBeDefined();
      expect(scales.yBarScale).toBeDefined();
      expect(scales.xBarScale('foo')).toBeUndefined();
      expect(scales.xBarScale('medium')).toBeLessThanOrEqual(containerWidth);
      expect(scales.yBarScale(-1000)).toBeLessThan(0);
      expect(scales.yBarScale(1000)).toBeLessThanOrEqual(containerHeight);
      expect(scales.yBarScale(6000)).toBeGreaterThan(containerHeight);
    });

    testWithoutWait(
      'Should render the vertical bar chart with numeric x-axis data - RTL',
      VerticalBarChart,
      { data: chartPoints },
      container => {
        // Assert
        expect(container).toMatchSnapshot();
      },
      () => {
        jest.spyOn(utils, 'getRTL').mockImplementation(() => true);
      },
    );

    it('Should return scales for numeric axis - RTL', () => {
      jest.spyOn(utils, 'getRTL').mockImplementation(() => true);
      const instance = new VerticalBarChartBase({
        data: chartPoints,
        theme: DarkTheme,
        margins: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      });
      expect(instance).toBeDefined();
      const containerHeight = 500;
      const containerWidth = 800;
      const isNumericAxis = true;

      const scales = instance.getScales(containerHeight, containerWidth, isNumericAxis);

      expect(scales.xBarScale).toBeDefined();
      expect(scales.yBarScale).toBeDefined();
      expect(scales.xBarScale(-2000)).toBeGreaterThan(containerWidth);
      expect(scales.xBarScale(20000)).toBeLessThanOrEqual(containerWidth);
      expect(scales.xBarScale(40000)).toBeLessThan(0);
      expect(scales.yBarScale(-5000)).toBeLessThan(0);
      expect(scales.yBarScale(5000)).toBeLessThanOrEqual(containerHeight);
      expect(scales.yBarScale(60000)).toBeGreaterThan(containerHeight);
    });
  });

  describe('create colors', () => {
    test('should return the color scale - using single color', () => {
      const instance = new VerticalBarChartBase({
        data: chartPoints,
        colors: [DefaultPalette.green],
        theme: DarkTheme,
        useSingleColor: true,
      });
      expect(instance).toBeDefined();
      const result = instance.createColors();
      expect(result).toBeDefined();
      expect(result(chartPoints[0].y)).toBe(DefaultPalette.green);
      expect(result(chartPoints[1].y)).toBe(DefaultPalette.green);
      expect(result(chartPoints[2].y)).toBe(DefaultPalette.green);
    });
    test('should return the color scale - using multiple color', () => {
      const instance = new VerticalBarChartBase({
        data: chartPoints,
        colors: [DefaultPalette.red, DefaultPalette.blue, DefaultPalette.green],
        theme: DarkTheme,
        useSingleColor: false,
      });
      expect(instance).toBeDefined();
      const result = instance.createColors();
      expect(result).toBeDefined();
      expect(result(chartPoints[0].y)).toBe('rgb(77, 86, 153)');
      expect(result(chartPoints[1].y)).toBe('rgb(37, 129, 0)');
      expect(result(chartPoints[2].y)).toBe('rgb(16, 124, 16)');
    });
  });

  describe('get aria labels', () => {
    test('returns an array of aria labels for each data point', () => {
      const instance = new VerticalBarChartBase({ data: chartPoints });
      expect(instance).toBeDefined();
      const result = instance.getAriaLabels();
      expect(result).toEqual([['2020/04/30. First, 10%.', '2020/04/30. Second, 20%.', '2020/04/30. Third, 37%.']]);
    });
    test('returns empty string for empty data', () => {
      const result = new VerticalBarChartBase({ data: [] }).getAriaLabels();
      expect(result).toEqual('');
    });
  });
});
