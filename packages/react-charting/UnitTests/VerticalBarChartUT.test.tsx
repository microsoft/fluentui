import { DarkTheme } from '@fluentui/theme-samples';
import { chartPoints } from '../src/components/VerticalBarChart/VerticalBarChart.test';
import { testWithoutWait } from '../src/utilities/TestUtility.test';
import * as utils from '@fluentui/react/lib/Utilities';
import { DefaultPalette } from '@fluentui/react';
import { VerticalBarChartBase } from '../src/components/VerticalBarChart/VerticalBarChart.base';
import { VerticalBarChart } from '../src/components/VerticalBarChart/VerticalBarChart';
import { max as d3Max } from 'd3-array';
import { IVerticalBarChartDataPoint } from '../src/index';
import { env } from './configUT';

const runTest = env === 'TEST' ? describe : describe.skip;

const stringPoints = [
  {
    x: 'medium',
    y: 3500,
    color: '#627CEF',
  },
  {
    x: 'long',
    y: 2500,
    color: '#C19C00',
  },
];

runTest('VerticalBarChart unit tests', () => {
  runTest('Get domain margins', () => {
    test('Should return the correct margins when total width is greater than required width', () => {
      const margin = {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      };
      const width = 1000;
      const instance = new VerticalBarChartBase({
        data: stringPoints,
        width: width,
        margins: margin,
      });
      expect(instance).toBeDefined();
      instance._xAxisLabels = stringPoints!.map((point: IVerticalBarChartDataPoint) => point.x as string);
      instance._getMargins(margin);
      const margins = instance._getDomainMargins(1000);
      expect(margins).toBeDefined();
      expect(margins.left).toEqual(468);
      expect(margins.right).toEqual(468);
      expect(margins.top).toEqual(10);
      expect(margins.bottom).toEqual(10);
    });
    test('Should return the correct margins when total width is less than required width', () => {
      const margin = {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      };
      const width = 1000;
      const instance = new VerticalBarChartBase({
        data: stringPoints,
        width: width,
        margins: margin,
      });
      expect(instance).toBeDefined();
      instance._getMargins(margin);
      instance._xAxisLabels = stringPoints!.map((point: IVerticalBarChartDataPoint) => point.x as string);
      const margins = instance._getDomainMargins();
      expect(margins).toBeDefined();
      expect(margins.left).toEqual(18);
      expect(margins.right).toEqual(18);
      expect(margins.top).toEqual(10);
      expect(margins.bottom).toEqual(10);
    });
  });
  runTest('Get scales', () => {
    it('Should return scales for numeric axis', () => {
      const margin = {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      };
      const instance = new VerticalBarChartBase({
        data: chartPoints,
        theme: DarkTheme,
        margins: margin,
      });
      expect(instance).toBeDefined();
      instance._adjustProps();
      instance._yMax = Math.max(
        d3Max(instance._points, (point: IVerticalBarChartDataPoint) => point.y)!,
        instance.props.yMaxValue || 0,
      );
      instance._xAxisLabels = chartPoints!.map((point: IVerticalBarChartDataPoint) => point.x as string);
      instance._getMargins(margin!);
      const containerHeight = 500;
      const containerWidth = 800;
      const isNumericAxis = true;

      const scales = instance._getScales(containerHeight, containerWidth, isNumericAxis);

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
      const margin = {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      };
      const instance = new VerticalBarChartBase({
        data: stringPoints,
        theme: DarkTheme,
        margins: margin,
      });
      expect(instance).toBeDefined();
      instance._adjustProps();
      instance._yMax = Math.max(
        d3Max(instance._points, (point: IVerticalBarChartDataPoint) => point.y)!,
        instance.props.yMaxValue || 0,
      );
      instance._xAxisLabels = stringPoints!.map((point: IVerticalBarChartDataPoint) => point.x as string);
      instance._getMargins(margin!);
      const containerHeight = 500;
      const containerWidth = 800;
      const isNumericAxis = false;
      const scales = instance._getScales(containerHeight, containerWidth, isNumericAxis);

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
      const margin = {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      };
      const instance = new VerticalBarChartBase({
        data: chartPoints,
        theme: DarkTheme,
        margins: margin,
      });
      expect(instance).toBeDefined();
      instance._adjustProps();
      instance._yMax = Math.max(
        d3Max(instance._points, (point: IVerticalBarChartDataPoint) => point.y)!,
        instance.props.yMaxValue || 0,
      );
      instance._xAxisLabels = chartPoints!.map((point: IVerticalBarChartDataPoint) => point.x as string);
      instance._getMargins(margin!);
      const containerHeight = 500;
      const containerWidth = 800;
      const isNumericAxis = true;

      const scales = instance._getScales(containerHeight, containerWidth, isNumericAxis);

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

  runTest('create colors', () => {
    test('should return the color scale - using single color', () => {
      const instance = new VerticalBarChartBase({
        data: chartPoints,
        colors: [DefaultPalette.green],
        theme: DarkTheme,
        useSingleColor: true,
      });
      expect(instance).toBeDefined();
      instance._getAxisData({ yAxisDomainValues: chartPoints.map(item => item.y) });
      instance._adjustProps();
      const result = instance._createColors();
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
      instance._getAxisData({ yAxisDomainValues: chartPoints.map(item => item.y) });
      instance._adjustProps();
      const result = instance._createColors();
      expect(result).toBeDefined();
      expect(result(chartPoints[0].y)).toBe('rgb(77, 86, 153)');
      expect(result(chartPoints[1].y)).toBe('rgb(37, 129, 0)');
      expect(result(chartPoints[2].y)).toBe('rgb(16, 124, 16)');
    });
  });

  runTest('get aria labels', () => {
    test('returns an array of aria labels for each data point', () => {
      const instance = new VerticalBarChartBase({ data: chartPoints });
      expect(instance).toBeDefined();
      const result = instance._getAriaLabel(chartPoints[0]);
      expect(result).toEqual('2020/04/30. First, 10%.');
    });
  });
});
