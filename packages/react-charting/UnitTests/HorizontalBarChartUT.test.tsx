import { render } from '@testing-library/react';
import * as React from 'react';
import { DarkTheme } from '@fluentui/theme-samples';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { HorizontalBarChart } from '../src/components/HorizontalBarChart/HorizontalBarChart';
import { HorizontalBarChartBase } from '../src/components/HorizontalBarChart/HorizontalBarChart.base';
import { IAccessibilityProps, IChartDataPoint, IChartProps } from '../src/components/HorizontalBarChart/index';
import { resetIds } from '@fluentui/react';

const env = require('../config/tests');
const runTest = env === 'TEST' ? describe : describe.skip;

const chartPoints: IChartProps[] = [
  {
    chartTitle: 'one',
    chartData: [
      {
        legend: 'one',
        horizontalBarChartdata: { x: 1543, y: 15000 },
        color: DefaultPalette.tealDark,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '10%',
      },
    ],
  },
];

const chartPointsWithBenchMark: IChartProps[] = [
  {
    chartTitle: 'one',
    chartData: [{ legend: 'one', data: 50, horizontalBarChartdata: { x: 10, y: 100 }, color: DefaultPalette.tealDark }],
  },
];

function sharedBeforeEach() {
  resetIds();
}

runTest('_getDefaultTextData', () => {
  beforeEach(sharedBeforeEach);

  test('Should return proper axis data without chartDataMode defined', () => {
    render(<HorizontalBarChart data={chartPoints} />);
    const instance = new HorizontalBarChartBase({
      data: chartPoints,
    });
    expect(instance).toBeDefined();
    instance._adjustProps();
    const defaultText = instance._getDefaultTextData(chartPoints[0]);
    expect(defaultText.props.children).toEqual('1,543');
  });

  test('Should return proper axis data with default chartDataMode', () => {
    const instance = new HorizontalBarChartBase({
      data: chartPoints,
      chartDataMode: 'default',
    });
    expect(instance).toBeDefined();
    instance._adjustProps();
    const defaultText = instance._getDefaultTextData(chartPoints[0]);
    expect(defaultText.props.children).toEqual('1,543');
  });

  test('Should return proper axis data with fraction chartDataMode', () => {
    const instance = new HorizontalBarChartBase({
      data: chartPoints,
      chartDataMode: 'fraction',
    });
    expect(instance).toBeDefined();
    instance._adjustProps();
    const defaultText = instance._getDefaultTextData(chartPoints[0]);
    expect(defaultText.props.children[0].props.children).toEqual('1,543');
    expect(defaultText.props.children[1].props.children).toEqual(' / 15,000');
  });

  test('Should return proper axis data with percentage chartDataMode', () => {
    const instance = new HorizontalBarChartBase({
      data: chartPoints,
      chartDataMode: 'percentage',
    });
    expect(instance).toBeDefined();
    instance._adjustProps();
    const defaultText = instance._getDefaultTextData(chartPoints[0]);
    expect(defaultText.props.children).toEqual('10%');
  });
});

runTest('_getChartDataText', () => {
  beforeEach(sharedBeforeEach);

  test('Should return proper text data with default chat data', () => {
    const instance = new HorizontalBarChartBase({
      data: chartPoints,
    });
    expect(instance).toBeDefined();
    instance._adjustProps();
    const defaultText = instance._getChartDataText(chartPoints[0]);
    expect(defaultText.props.children).toEqual('1,543');
  });

  test('Should return proper text data with custom chat data', () => {
    const instance = new HorizontalBarChartBase({
      data: chartPoints,
      barChartCustomData: (props: IChartProps) =>
        props ? (
          <div className="barChartCustomData">
            <p>Bar Custom Data</p>
          </div>
        ) : null,
    });
    expect(instance).toBeDefined();
    instance._adjustProps();
    const defaultText = instance._getChartDataText(chartPoints[0]);
    expect(defaultText.props.children.props.children.props.children).toEqual('Bar Custom Data');
  });
});

runTest('_createBenchmark', () => {
  beforeEach(sharedBeforeEach);

  test('Should return proper benchmark data without any benachmark data in input', () => {
    const instance = new HorizontalBarChartBase({
      data: chartPoints,
    });
    expect(instance).toBeDefined();
    instance._adjustProps();
    const defaultText = instance._createBenchmark(chartPoints[0]);
    expect(defaultText.props.children.props.style.left).toEqual('calc(0% - 4px)');
  });

  test('Should return proper benchmark data with proper benachmark data in input', () => {
    const instance = new HorizontalBarChartBase({
      data: chartPoints,
    });
    expect(instance).toBeDefined();
    instance._adjustProps();
    const defaultText = instance._createBenchmark(chartPointsWithBenchMark[0]);
    expect(defaultText.props.children.props.style.left).toEqual('calc(50% - 4px)');
  });
});

runTest('_createBars', () => {
  beforeEach(sharedBeforeEach);

  test('Should return bar count properly', () => {
    const instance = new HorizontalBarChartBase({
      data: chartPoints,
    });
    expect(instance).toBeDefined();
    instance._adjustProps();
    const { palette } = DarkTheme;
    const bars = instance._createBars(chartPoints[0], palette);
    expect(bars).toHaveLength(2);
  });

  test('Should return bar width properly', () => {
    const instance = new HorizontalBarChartBase({
      data: chartPoints,
    });
    expect(instance).toBeDefined();
    instance._adjustProps();
    const { palette } = DarkTheme;
    const bars = instance._createBars(chartPoints[0], palette);
    expect(bars).toHaveLength(2);
    expect(bars[0].props.width).toEqual('10.286666666666665%');
    expect(bars[1].props.width).toEqual('89.71333333333334%');
  });

  test('Should return bar heigh properly', () => {
    const instance = new HorizontalBarChartBase({
      data: chartPoints,
      barHeight: 15,
    });
    expect(instance).toBeDefined();
    instance._adjustProps();
    const { palette } = DarkTheme;
    const bars = instance._createBars(chartPoints[0], palette);
    expect(bars).toHaveLength(2);
    expect(bars[0].props.height).toEqual(15);
    expect(bars[1].props.height).toEqual(15);
  });
});

runTest('_getAriaLabel', () => {
  beforeEach(sharedBeforeEach);

  test('Should return bar aria-label as 0 when there is no chart data', () => {
    const instance = new HorizontalBarChartBase({
      data: chartPoints,
    });
    expect(instance).toBeDefined();
    const emptyChartPoint: IChartDataPoint = {};
    const ariaLabel = instance._getAriaLabel(emptyChartPoint);
    expect(ariaLabel).toEqual('0.');
  });

  test('Should return bar aria-label properly when proper chart data is there', () => {
    const instance = new HorizontalBarChartBase({
      data: chartPoints,
    });
    expect(instance).toBeDefined();
    const chartPoint: IChartDataPoint = {
      legend: 'one',
      horizontalBarChartdata: { x: 1543, y: 15000 },
      color: DefaultPalette.tealDark,
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '10%',
    };
    const ariaLabel = instance._getAriaLabel(chartPoint);
    expect(ariaLabel).toEqual('2020/04/30, 10%.');
  });

  test('Should return bar aria-label properly when there is no yAxisCalloutData', () => {
    const instance = new HorizontalBarChartBase({
      data: chartPoints,
    });
    expect(instance).toBeDefined();
    const chartPoint: IChartDataPoint = {
      legend: 'one',
      horizontalBarChartdata: { x: 1543, y: 15000 },
      color: DefaultPalette.tealDark,
      xAxisCalloutData: '2020/04/30',
    };
    const ariaLabel = instance._getAriaLabel(chartPoint);
    expect(ariaLabel).toEqual('2020/04/30, 1543/15000.');
  });

  test('Should return bar aria-label properly when there is no xAxisCalloutData', () => {
    const instance = new HorizontalBarChartBase({
      data: chartPoints,
    });
    expect(instance).toBeDefined();
    const chartPoint: IChartDataPoint = {
      legend: 'one',
      horizontalBarChartdata: { x: 1543, y: 15000 },
      color: DefaultPalette.tealDark,
      yAxisCalloutData: '10%',
    };
    const ariaLabel = instance._getAriaLabel(chartPoint);
    expect(ariaLabel).toEqual('one, 10%.');
  });

  test('Should return bar aria- label properly when there is no xAxisCalloutData and yAxisCalloutData', () => {
    const instance = new HorizontalBarChartBase({
      data: chartPoints,
    });
    expect(instance).toBeDefined();
    const chartPoint: IChartDataPoint = {
      legend: 'one',
      horizontalBarChartdata: { x: 1543, y: 15000 },
      color: DefaultPalette.tealDark,
    };
    const ariaLabel = instance._getAriaLabel(chartPoint);
    expect(ariaLabel).toEqual('one, 1543/15000.');
  });

  test('Should return bar aria-label properly when there is no xAxisCalloutData, yAxisCalloutData and horizontalBarChartdata', () => {
    const instance = new HorizontalBarChartBase({
      data: chartPoints,
    });
    expect(instance).toBeDefined();
    const chartPoint: IChartDataPoint = {
      legend: 'one',
      color: DefaultPalette.tealDark,
    };
    const ariaLabel = instance._getAriaLabel(chartPoint);
    expect(ariaLabel).toEqual('one, 0.');
  });

  test('Should return bar aria-label properly when we have callOutAccessibilityData', () => {
    const instance = new HorizontalBarChartBase({
      data: chartPoints,
    });
    expect(instance).toBeDefined();
    const accessibilityData: IAccessibilityProps = {
      ariaLabel: 'Accessibility label',
    };
    const chartPoint: IChartDataPoint = {
      legend: 'one',
      callOutAccessibilityData: accessibilityData,
    };
    const ariaLabel = instance._getAriaLabel(chartPoint);
    expect(ariaLabel).toEqual('Accessibility label');
  });

  test('Should return bar aria-label properly when we have callOutAccessibilityData and other properties', () => {
    const instance = new HorizontalBarChartBase({
      data: chartPoints,
    });
    expect(instance).toBeDefined();
    const accessibilityData: IAccessibilityProps = {
      ariaLabel: 'Accessibility label',
    };
    const chartPoint: IChartDataPoint = {
      legend: 'one',
      horizontalBarChartdata: { x: 1543, y: 15000 },
      color: DefaultPalette.tealDark,
      xAxisCalloutData: '2020/04/30',
      callOutAccessibilityData: accessibilityData,
    };
    const ariaLabel = instance._getAriaLabel(chartPoint);
    expect(ariaLabel).toEqual('Accessibility label');
  });
});
