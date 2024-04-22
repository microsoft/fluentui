import { HorizontalBarChartWithAxis } from '../src/components/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis';
import * as React from 'react';
import { HorizontalBarChartWithAxisBase } from '../src/components/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis.base';
import { IAccessibilityProps, IHorizontalBarChartWithAxisDataPoint } from '../src/HorizontalBarChart';
import { DefaultPalette } from '@fluentui/react';
import { render } from '@testing-library/react';
import { DarkTheme } from '@fluentui/theme-samples';
import * as utils from '@fluentui/react/lib/Utilities';
import { resetIds } from '@fluentui/react';

const env = require('../config/tests');

const runTest = env === 'TEST' ? describe : describe.skip;

const emptyData: IHorizontalBarChartWithAxisDataPoint[] = [];
const chartPoints: IHorizontalBarChartWithAxisDataPoint[] = [
  {
    x: 10000,
    y: 5000,
    legend: 'Oranges',
    color: DefaultPalette.accent,
    yAxisCalloutData: '2020/04/30',
    xAxisCalloutData: '10%',
  },
  {
    x: 20000,
    y: 50000,
    legend: 'Grapes',
    color: DefaultPalette.blueDark,
    yAxisCalloutData: '2020/04/30',
  },
  {
    x: 25000,
    y: 30000,
    legend: 'Apples',
    color: DefaultPalette.blueMid,
    xAxisCalloutData: '37%',
  },
  {
    x: 40000,
    y: 13000,
    legend: 'Bananas',
    color: DefaultPalette.blueLight,
  },
  {
    x: 90000,
    y: 15000,
    color: DefaultPalette.blueLight,
  },
];

const chartPointsWithStringYAxis: IHorizontalBarChartWithAxisDataPoint[] = [
  {
    y: 'String One',
    x: 1000,
    legend: 'One',
    color: DefaultPalette.accent,
  },
  {
    y: 'String Two',
    x: 5000,
    legend: 'Two',
    color: DefaultPalette.blueDark,
  },
];

const margins = {
  left: 10,
  right: 10,
  top: 10,
  bottom: 10,
};

function sharedBeforeEach() {
  resetIds();
}

runTest('_renderContentForOnlyBars', () => {
  beforeEach(sharedBeforeEach);

  test('Should return proper bar data', () => {
    render(<HorizontalBarChartWithAxis data={chartPoints} />);
    const instance = new HorizontalBarChartWithAxisBase({
      data: chartPoints,
      theme: DarkTheme,
    });
    expect(instance).toBeDefined();
    instance._adjustProps();
    const result = instance._renderContentForOnlyBars(chartPoints[0]);
    expect(result.props.children).not.toBeNull();
    const barData = result.props.children.props;
    expect(barData.Legend).toEqual('Oranges');
    expect(barData.XValue).toEqual('10%');
    expect(barData.YValue).toEqual('2020/04/30');
  });

  test('Should return proper bar data without xAxisCalloutData', () => {
    const instance = new HorizontalBarChartWithAxisBase({
      data: chartPoints,
      theme: DarkTheme,
    });
    expect(instance).toBeDefined();
    instance._adjustProps();
    const result = instance._renderContentForOnlyBars(chartPoints[1]);
    expect(result.props.children).not.toBeNull();
    const barData = result.props.children.props;
    expect(barData.Legend).toEqual('Grapes');
    expect(barData.YValue).toEqual('2020/04/30');
  });

  test('Should return proper bar data without yAxisCalloutData', () => {
    const instance = new HorizontalBarChartWithAxisBase({
      data: chartPoints,
      theme: DarkTheme,
    });
    expect(instance).toBeDefined();
    instance._adjustProps();
    const result = instance._renderContentForOnlyBars(chartPoints[2]);
    expect(result.props.children).not.toBeNull();
    const barData = result.props.children.props;
    expect(barData.Legend).toEqual('Apples');
    expect(barData.XValue).toEqual('37%');
    expect(barData.YValue).toEqual(30000);
  });

  test('Should return proper bar data without xAxisCalloutData and yAxisCalloutData', () => {
    const instance = new HorizontalBarChartWithAxisBase({
      data: chartPoints,
      theme: DarkTheme,
    });
    expect(instance).toBeDefined();
    instance._adjustProps();
    const result = instance._renderContentForOnlyBars(chartPoints[3]);
    expect(result.props.children).not.toBeNull();
    const barData = result.props.children.props;
    expect(barData.Legend).toEqual('Bananas');
    expect(barData.XValue).toEqual('40000');
    expect(barData.YValue).toEqual(13000);
  });

  test('Should return proper bar data without legend, xAxisCalloutData and yAxisCalloutData', () => {
    const instance = new HorizontalBarChartWithAxisBase({
      data: chartPoints,
      theme: DarkTheme,
    });
    expect(instance).toBeDefined();
    instance._adjustProps();
    const result = instance._renderContentForOnlyBars(chartPoints[4]);
    expect(result.props.children).not.toBeNull();
    const barData = result.props.children.props;
    expect(barData.Legend).toEqual(undefined);
    expect(barData.XValue).toEqual('90000');
    expect(barData.YValue).toEqual(15000);
  });
});

runTest('Get scales', () => {
  beforeEach(sharedBeforeEach);

  test('Should return scales for numeric axis', () => {
    const instance = new HorizontalBarChartWithAxisBase({
      data: chartPoints,
      theme: DarkTheme,
    });
    expect(instance).toBeDefined();
    instance._adjustProps();
    instance._getMargins(margins);
    const containerHeight = 500;
    const containerWidth = 800;
    const isNumericAxis = true;

    const scales = instance._getScales(containerHeight, containerWidth, isNumericAxis);
    expect(scales.xBarScale).toBeDefined();
    expect(scales.yBarScale).toBeDefined();
    expect(scales.xBarScale(-1500)).toBeLessThan(0);
    expect(scales.xBarScale(20000)).toBeLessThanOrEqual(containerWidth);
    expect(scales.xBarScale(100000)).toBeGreaterThan(containerWidth);
    expect(Math.ceil(scales.xBarScale(91100))).toEqual(containerWidth);
    expect(scales.yBarScale(100000)).toBeLessThan(0);
    expect(scales.yBarScale(5000)).toBeLessThanOrEqual(containerHeight);
    expect(scales.yBarScale(-70000)).toBeGreaterThan(containerHeight);
    expect(Math.ceil(scales.yBarScale(-1000))).toEqual(containerHeight);
  });

  test('Should return scales for non-numeric axis', () => {
    const instance = new HorizontalBarChartWithAxisBase({
      data: chartPointsWithStringYAxis,
      theme: DarkTheme,
    });
    expect(instance).toBeDefined();
    instance._adjustProps();
    instance._getMargins(margins);
    const containerHeight = 500;
    const containerWidth = 800;
    const isNumericAxis = false;
    instance._yAxisLabels = ['test'];

    const scales = instance._getScales(containerHeight, containerWidth, isNumericAxis);

    expect(scales.xBarScale).toBeDefined();
    expect(scales.yBarScale).toBeDefined();
    expect(scales.yBarScale('foo')).toBeUndefined();
    expect(scales.yBarScale('test')).toBeLessThanOrEqual(containerWidth);
    expect(scales.xBarScale(-1000)).toBeLessThan(0);
    expect(scales.xBarScale(1000)).toBeLessThanOrEqual(containerHeight);
    expect(scales.xBarScale(6000)).toBeGreaterThan(containerHeight);
    expect(Math.ceil(scales.xBarScale(3140))).toEqual(containerHeight);
  });

  test('Should return scales for numeric axis - RTL', () => {
    jest.spyOn(utils, 'getRTL').mockImplementation(() => true);
    const instance = new HorizontalBarChartWithAxisBase({
      data: chartPoints,
      theme: DarkTheme,
      margins: margins,
    });
    expect(instance).toBeDefined();
    instance._adjustProps();
    instance._getMargins(margins);
    const containerHeight = 500;
    const containerWidth = 800;
    const isNumericAxis = true;

    const scales = instance._getScales(containerHeight, containerWidth, isNumericAxis);
    expect(scales.xBarScale).toBeDefined();
    expect(scales.yBarScale).toBeDefined();
    expect(scales.xBarScale(100000)).toBeLessThan(0);
    expect(scales.xBarScale(20000)).toBeLessThanOrEqual(containerWidth);
    expect(scales.xBarScale(-2000)).toBeGreaterThan(containerWidth);
    expect(Math.ceil(scales.xBarScale(-1100))).toEqual(containerWidth);
    expect(scales.yBarScale(100000)).toBeLessThan(0);
    expect(scales.yBarScale(5000)).toBeLessThanOrEqual(containerHeight);
    expect(scales.yBarScale(-70000)).toBeGreaterThan(containerHeight);
    expect(Math.ceil(scales.yBarScale(-1000))).toEqual(containerHeight);
  });
});

runTest('_createNumericBars', () => {
  beforeEach(sharedBeforeEach);

  test('Should return proper bar data with numeric axis data', () => {
    const instance = new HorizontalBarChartWithAxisBase({
      data: chartPoints,
      theme: DarkTheme,
    });
    expect(instance).toBeDefined();
    instance._adjustProps();
    instance._getMargins(margins);
    const bars = instance._createNumericBars(100, 100, undefined!, undefined!);
    expect(bars).not.toBeNull();
    expect(bars).toHaveLength(5);
    expect(bars[0].type).toEqual('rect');
    expect(bars[0].key).toEqual('50000');
    expect(bars[0].props['aria-label']).toEqual('20000. 2020/04/30.');
  });

  test('Should return proper bar width when container width is 0', () => {
    const instance = new HorizontalBarChartWithAxisBase({
      data: chartPoints,
      theme: DarkTheme,
    });
    expect(instance).toBeDefined();
    instance._adjustProps();
    instance._getMargins(margins);
    const bars = instance._createNumericBars(0, 0, undefined!, undefined!);
    expect(bars).not.toBeNull();
    expect(bars).toHaveLength(5);
    expect(bars[0].props.width).toBeLessThan(0);
  });
});

runTest('_getCalloutContentForBar', () => {
  beforeEach(sharedBeforeEach);

  test('Should return proper callout data for respective bar', () => {
    const instance = new HorizontalBarChartWithAxisBase({
      data: chartPoints,
      theme: DarkTheme,
    });
    expect(instance).toBeDefined();
    const calloutContentForBar = instance._getCalloutContentForBar(chartPoints[0]);
    expect(calloutContentForBar).not.toBeNull();
    expect(calloutContentForBar.hoverXValue).toEqual('2020/04/30');
    expect(calloutContentForBar.YValueHover[0]).not.toBeNull();
    const callOutData = calloutContentForBar.YValueHover[0];
    expect(callOutData.legend).toEqual('Oranges');
    expect(callOutData.data).toEqual('2020/04/30');
    expect(callOutData.yAxisCalloutData).toEqual('2020/04/30');
  });
});

runTest('create colors', () => {
  beforeEach(sharedBeforeEach);

  test('should return the color scale - using single color', () => {
    const instance = new HorizontalBarChartWithAxisBase({
      data: chartPoints,
      colors: [DefaultPalette.green],
      theme: DarkTheme,
      useSingleColor: true,
    });
    expect(instance).toBeDefined();
    instance._adjustProps();
    instance._getAxisData({ yAxisDomainValues: chartPoints.map(item => item.x) });
    const result = instance._createColors();
    expect(result).toBeDefined();
    expect(result(chartPoints[0].x)).toBe(DefaultPalette.green);
    expect(result(chartPoints[1].x)).toBe(DefaultPalette.green);
    expect(result(chartPoints[2].x)).toBe(DefaultPalette.green);
  });
  test('should return the color scale - using multiple color', () => {
    const instance = new HorizontalBarChartWithAxisBase({
      data: chartPoints,
      colors: [DefaultPalette.red, DefaultPalette.blue, DefaultPalette.green],
      theme: DarkTheme,
      useSingleColor: false,
    });
    expect(instance).toBeDefined();
    instance._getAxisData({ yAxisDomainValues: chartPoints.map(item => item.x) });
    instance._adjustProps();
    const result = instance._createColors();
    expect(result).toBeDefined();
    expect(result(chartPoints[0].x)).toBe('rgb(180, 40, 74)');
    expect(result(chartPoints[1].x)).toBe('rgb(129, 63, 114)');
    expect(result(chartPoints[2].x)).toBe('rgb(103, 74, 133)');
  });
});

runTest('_getLegendData', () => {
  beforeEach(sharedBeforeEach);

  test('Should return empty legends data when there is no chart data', () => {
    const instance = new HorizontalBarChartWithAxisBase({
      data: emptyData,
      theme: DarkTheme,
    });
    expect(instance).toBeDefined();
    const { palette } = DarkTheme;
    const result = instance._getLegendData(emptyData, palette);
    expect(result.props.legends).toHaveLength(0);
  });

  test('Should return proper legends data with numaric yAxis data', () => {
    const instance = new HorizontalBarChartWithAxisBase({
      data: emptyData,
      theme: DarkTheme,
    });
    expect(instance).toBeDefined();
    const { palette } = DarkTheme;
    const result = instance._getLegendData(chartPoints, palette);
    expect(result.props.legends).toHaveLength(5);
    const legends = result.props.legends;
    expect(legends[0].title).toEqual('Oranges');
    expect(legends[1].title).toEqual('Grapes');
    expect(legends[2].title).toEqual('Apples');
    expect(legends[3].title).toEqual('Bananas');
    expect(legends[4].title).toEqual(undefined);
  });

  test('Should return proper legends data with string yAxis data', () => {
    const instance = new HorizontalBarChartWithAxisBase({
      data: emptyData,
      theme: DarkTheme,
    });
    expect(instance).toBeDefined();
    const { palette } = DarkTheme;
    const result = instance._getLegendData(chartPointsWithStringYAxis, palette);
    expect(result.props.legends).toHaveLength(2);
    const legends = result.props.legends;
    expect(legends[0].title).toEqual('One');
    expect(legends[1].title).toEqual('Two');
  });
});

runTest('_getAriaLabel', () => {
  beforeEach(sharedBeforeEach);

  test('Should return proper aria label', () => {
    const instance = new HorizontalBarChartWithAxisBase({
      data: emptyData,
      theme: DarkTheme,
    });
    expect(instance).toBeDefined();
    const ariaLabel = instance._getAriaLabel(chartPoints[0]);
    expect(ariaLabel).toEqual('10%. 2020/04/30.');
  });

  test('Should return proper aria label without xAxisCalloutData', () => {
    const instance = new HorizontalBarChartWithAxisBase({
      data: emptyData,
      theme: DarkTheme,
    });
    expect(instance).toBeDefined();
    const ariaLabel = instance._getAriaLabel(chartPoints[1]);
    expect(ariaLabel).toEqual('20000. 2020/04/30.');
  });

  test('Should return proper aria label without yAxisCalloutData', () => {
    const instance = new HorizontalBarChartWithAxisBase({
      data: emptyData,
      theme: DarkTheme,
    });
    expect(instance).toBeDefined();
    const ariaLabel = instance._getAriaLabel(chartPoints[2]);
    expect(ariaLabel).toEqual('37%. 30000.');
  });

  test('Should return proper aria label without xAxisCalloutData and yAxisCalloutData', () => {
    const instance = new HorizontalBarChartWithAxisBase({
      data: emptyData,
      theme: DarkTheme,
    });
    expect(instance).toBeDefined();
    const ariaLabel = instance._getAriaLabel(chartPoints[3]);
    expect(ariaLabel).toEqual('40000. 13000.');
  });

  test('Should return bar aria-label properly when we have callOutAccessibilityData', () => {
    const instance = new HorizontalBarChartWithAxisBase({
      data: emptyData,
    });
    expect(instance).toBeDefined();
    const accessibilityData: IAccessibilityProps = {
      ariaLabel: 'Accessibility label',
    };
    const chartPoint: IHorizontalBarChartWithAxisDataPoint = {
      x: 10000,
      y: 5000,
      callOutAccessibilityData: accessibilityData,
    };
    const ariaLabel = instance._getAriaLabel(chartPoint);
    expect(ariaLabel).toEqual('Accessibility label');
  });

  test('Should return bar aria-label properly when we have callOutAccessibilityData and other properties', () => {
    const instance = new HorizontalBarChartWithAxisBase({
      data: emptyData,
    });
    expect(instance).toBeDefined();
    const accessibilityData: IAccessibilityProps = {
      ariaLabel: 'Accessibility label',
    };
    const chartPoint: IHorizontalBarChartWithAxisDataPoint = {
      x: 10000,
      y: 5000,
      legend: 'Oranges',
      color: DefaultPalette.accent,
      yAxisCalloutData: '2020/04/30',
      xAxisCalloutData: '10%',
      callOutAccessibilityData: accessibilityData,
    };
    const ariaLabel = instance._getAriaLabel(chartPoint);
    expect(ariaLabel).toEqual('Accessibility label');
  });
});
