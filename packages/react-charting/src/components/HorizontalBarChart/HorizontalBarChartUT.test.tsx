import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import * as React from 'react';
import { DarkTheme } from '@fluentui/theme-samples';
import { ThemeProvider } from '@fluentui/react';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { HorizontalBarChart } from './HorizontalBarChart';
import { HorizontalBarChartBase } from './HorizontalBarChart.base';
import { HorizontalBarChartVariant, IChartProps } from './index';

const env = require('../../../config/tests');

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
  {
    chartTitle: 'two',
    chartData: [
      {
        legend: 'two',
        horizontalBarChartdata: { x: 800, y: 15000 },
        color: DefaultPalette.purple,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '5%',
      },
    ],
  },
  {
    chartTitle: 'three',
    chartData: [
      {
        legend: 'three',
        horizontalBarChartdata: { x: 8888, y: 15000 },
        color: DefaultPalette.redDark,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '59%',
      },
    ],
  },
];

const chartPointsWithBenchMark: IChartProps[] = [
  {
    chartTitle: 'one',
    chartData: [{ legend: 'one', data: 50, horizontalBarChartdata: { x: 10, y: 100 }, color: DefaultPalette.tealDark }],
  },
  {
    chartTitle: 'two',
    chartData: [{ legend: 'two', data: 30, horizontalBarChartdata: { x: 30, y: 200 }, color: DefaultPalette.purple }],
  },
  {
    chartTitle: 'three',
    chartData: [{ legend: 'three', data: 5, horizontalBarChartdata: { x: 15, y: 50 }, color: DefaultPalette.redDark }],
  },
];

describe('_getDefaultTextData', () => {
  test('Should return proper test data without chartDataMode', () => {
    render(<HorizontalBarChart data={chartPoints} />);
    const instance = new HorizontalBarChartBase({
      data: chartPoints,
    });
    expect(instance).toBeDefined();
    instance._adjustProps();
    const defaultText = instance._getDefaultTextData(chartPoints[0]);
    expect(defaultText.props.children).toEqual('1,543');
  });

  test('Should return proper test data with default chartDataMode', () => {
    const instance = new HorizontalBarChartBase({
      data: chartPoints,
      chartDataMode: 'default',
    });
    expect(instance).toBeDefined();
    instance._adjustProps();
    const defaultText = instance._getDefaultTextData(chartPoints[0]);
    expect(defaultText.props.children).toEqual('1,543');
  });

  test('Should return proper test data with fraction chartDataMode', () => {
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

  test('Should return proper test data with percentage chartDataMode', () => {
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

describe('_getChartDataText', () => {
  test('Should return proper test data with default text data', () => {
    const instance = new HorizontalBarChartBase({
      data: chartPoints,
    });
    expect(instance).toBeDefined();
    instance._adjustProps();
    const defaultText = instance._getDefaultTextData(chartPoints[0]);
    expect(defaultText.props.children).toEqual('1,543');
  });

  test('Should return proper test data with custom chat data', () => {
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

describe('_createBenchmark', () => {
  test('Should return proper bench mark data without any benachmark data in input', () => {
    const instance = new HorizontalBarChartBase({
      data: chartPoints,
    });
    expect(instance).toBeDefined();
    instance._adjustProps();
    const defaultText = instance._createBenchmark(chartPoints[0]);
    expect(defaultText.props.children.props.style.left).toEqual('calc(0% - 4px)');
  });

  test('Should return proper bench mark data proper benachmark data in input', () => {
    const instance = new HorizontalBarChartBase({
      data: chartPoints,
    });
    expect(instance).toBeDefined();
    instance._adjustProps();
    const defaultText = instance._createBenchmark(chartPointsWithBenchMark[0]);
    expect(defaultText.props.children.props.style.left).toEqual('calc(50% - 4px)');
  });
});
