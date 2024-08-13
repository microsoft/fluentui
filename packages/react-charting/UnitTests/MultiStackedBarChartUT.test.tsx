import * as React from 'react';
import { render } from '@testing-library/react';
import { DarkTheme } from '@fluentui/theme-samples';
import { IChartDataPoint, IChartProps, MultiStackedBarChart } from '../src/index';
import { MultiStackedBarChartBase } from '../src/components/StackedBarChart/MultiStackedBarChart.base';
import { resetIds } from '@fluentui/react';
const env = require('../config/tests');

const runTest = env === 'TEST' ? describe : describe.skip;

const firstChartPoints: IChartDataPoint[] = [
  {
    legend: 'Debit card numbers (EU and USA)',
    data: 40,
    color: '#0099BC',
    callOutAccessibilityData: { ariaLabel: 'Bar series 1 of 13 Debit card numbers (EU and USA) 40' },
  },
  {
    legend: 'Passport numbers (USA)',
    data: 23,
    color: '#77004D',
    callOutAccessibilityData: { ariaLabel: '' },
  },
  {
    legend: '',
    data: 35,
    color: '#4F68ED',
    callOutAccessibilityData: { ariaLabel: '' },
  },
];

const firstChartPoints1: IChartDataPoint[] = [
  {
    legend: 'Debit card numbers (EU and USA)',
    data: 40,
    color: '#0099BC',
    callOutAccessibilityData: { ariaLabel: 'Bar series 1 of 5 Debit card numbers (EU and USA) 40' },
  },
  {
    legend: 'Passport numbers (USA)',
    data: 56,
    color: '#77004D',
    callOutAccessibilityData: { ariaLabel: 'Bar series 2 of 5 Passport numbers (USA) 56' },
  },
  {
    legend: 'Social security numbers',
    data: 35,
    color: '#4F68ED',
    callOutAccessibilityData: { ariaLabel: 'Bar series 3 of 5 Social security numbers 35' },
  },
  {
    legend: 'Credit card numbers',
    data: 92,
    color: '#AE8C00',
    callOutAccessibilityData: { ariaLabel: 'Bar series 4 of 5 Credit card numbers 92' },
  },
];

const secondChartPoints: IChartDataPoint[] = [
  {
    legend: 'Phone Numbers',
    data: 40,
    color: '#881798',
    callOutAccessibilityData: { ariaLabel: 'Bar series 1 of 2 Phone Numbers 40' },
  },
  {
    legend: 'Credit card Numbers',
    data: 23,
    color: '#AE8C00',
    callOutAccessibilityData: { ariaLabel: 'Bar series 2 of 2 Credit card Numbers 23' },
  },
];

const data: IChartProps[] = [
  {
    chartTitle: 'Monitored',
    chartData: firstChartPoints,
  },
  {
    chartTitle: 'Monitored Second Chart',
    chartData: firstChartPoints1,
  },
  {
    chartTitle: 'Unmonitored',
    chartData: secondChartPoints,
  },
];

function sharedBeforeEach() {
  resetIds();
}

runTest('_createBarsAndLegends', () => {
  beforeEach(sharedBeforeEach);

  test('Should return bars count correctly', () => {
    render(<MultiStackedBarChart data={data} />);
    const instance = new MultiStackedBarChartBase({
      data: data,
    });
    expect(instance).toBeDefined();
    const { palette } = DarkTheme;
    const barHeight = 300;
    const hideRatio = false;
    const hideDenominator = false;
    const href = '';
    const barsAndLegends = instance._createBarsAndLegends(
      data[0],
      barHeight,
      palette,
      hideRatio,
      hideDenominator,
      href,
    );
    const barsDataObject = barsAndLegends.props.children[1]['props']['children'];
    expect(barsDataObject['props']).not.toBeNull();
    const noOfBars = barsDataObject['props']['children']['props']['children'];
    expect(noOfBars).toHaveLength(3);
  });

  test('Should return bars height correctly', () => {
    const instance = new MultiStackedBarChartBase({
      data: data,
    });
    expect(instance).toBeDefined();
    const { palette } = DarkTheme;
    const barHeight = 300;
    const hideRatio = false;
    const hideDenominator = false;
    const href = '';
    const barsAndLegends = instance._createBarsAndLegends(
      data[0],
      barHeight,
      palette,
      hideRatio,
      hideDenominator,
      href,
    );
    const barsDataObject = barsAndLegends.props.children[1]['props']['children'];
    expect(barsDataObject['props']).not.toBeNull();
    const noOfBars = barsDataObject['props']['children']['props']['children'];
    expect(noOfBars).toHaveLength(3);
    const firstBar = noOfBars[0].props;
    expect(firstBar['children']['type']).toEqual('rect');
    expect(firstBar['children']['props']['height']).toEqual(barHeight);
  });

  test('Should return bars area label correctly', () => {
    const instance = new MultiStackedBarChartBase({
      data: data,
    });
    expect(instance).toBeDefined();
    const { palette } = DarkTheme;
    const barHeight = 500;
    const hideRatio = false;
    const hideDenominator = false;
    const href = '';
    const barsAndLegends = instance._createBarsAndLegends(
      data[0],
      barHeight,
      palette,
      hideRatio,
      hideDenominator,
      href,
    );
    const barsDataObject = barsAndLegends.props.children[1]['props']['children'];
    expect(barsDataObject['props']).not.toBeNull();
    const noOfBars = barsDataObject['props']['children']['props']['children'];
    expect(noOfBars).toHaveLength(3);
    const firstBar = noOfBars[0].props;
    expect(firstBar['aria-label']).toEqual('Bar series 1 of 13 Debit card numbers (EU and USA) 40');
    const secondBar = noOfBars[1].props;
    expect(secondBar['aria-label']).toEqual('Passport numbers (USA), 23.');
    const thrirdBar = noOfBars[2].props;
    expect(thrirdBar['aria-label']).toEqual('35.');
  });
});

runTest('_getLegendData', () => {
  beforeEach(sharedBeforeEach);

  test('Should return proper legend data when we have proper data', () => {
    const instance = new MultiStackedBarChartBase({
      data: data,
    });
    expect(instance).toBeDefined();
    const { palette } = DarkTheme;
    const hideRatio = [false];
    const legendsData = instance._getLegendData(data, hideRatio, palette);
    const legends = legendsData.props['legends'];
    expect(legends).toHaveLength(5);
  });

  test('Should return empty legend data when we do not have proper data', () => {
    const instance = new MultiStackedBarChartBase({
      data: data,
    });
    expect(instance).toBeDefined();
    const { palette } = DarkTheme;
    const hideRatio = [false];
    const legendsData = instance._getLegendData([], hideRatio, palette);
    const legends = legendsData.props['legends'];
    expect(legends).toHaveLength(0);
  });

  test('Should return legends data with properties', () => {
    const instance = new MultiStackedBarChartBase({
      data: data,
    });
    expect(instance).toBeDefined();
    const { palette } = DarkTheme;
    const hideRatio = [false];
    const legendsData = instance._getLegendData(data, hideRatio, palette);
    const legends = legendsData.props['legends'];
    expect(legends).toHaveLength(5);
    expect(legends[0]['title']).toEqual('Debit card numbers (EU and USA)');
    expect(legends[1]['title']).toEqual('Passport numbers (USA)');
    expect(legends[2]['title']).toEqual('');
    expect(legends[3]['title']).toEqual('Social security numbers');
    expect(legends[4]['title']).toEqual('Credit card numbers');
  });
});

runTest('_isChartEmpty', () => {
  beforeEach(sharedBeforeEach);

  test('Should return true when chart data is empty ', () => {
    const emptyData: IChartProps[] = [];
    const instance = new MultiStackedBarChartBase({
      data: emptyData,
    });
    const isChartEmpty = instance._isChartEmpty();
    expect(instance).toBeDefined();
    expect(isChartEmpty).toEqual(true);
  });

  test('Should return false when chart data is not empty ', () => {
    const instance = new MultiStackedBarChartBase({
      data: data,
    });
    const isChartEmpty = instance._isChartEmpty();
    expect(instance).toBeDefined();
    expect(isChartEmpty).toEqual(false);
  });
});

runTest('_getAriaLabel', () => {
  beforeEach(sharedBeforeEach);

  test('Should return correct aria label for a bar where we have aria label in callOutAccessibilityData', () => {
    const instance = new MultiStackedBarChartBase({
      data: data,
    });
    expect(instance).toBeDefined();
    expect(instance._getAriaLabel(firstChartPoints[0])).toEqual(
      'Bar series 1 of 13 Debit card numbers (EU and USA) 40',
    );
  });

  test('Should return correct aria label for a bar when we do not have aria-label in callOutAccessibilityData', () => {
    const emptyData: IChartProps[] = [];
    const instance = new MultiStackedBarChartBase({
      data: emptyData,
    });
    expect(instance).toBeDefined();
    expect(instance._getAriaLabel(firstChartPoints[1])).toEqual('Passport numbers (USA), 23.');
  });

  test('Should return correct aria label for a bar where we do not have aria-label in callOutAccessibilityData and legend data', () => {
    const emptyData: IChartProps[] = [];
    const instance = new MultiStackedBarChartBase({
      data: emptyData,
    });
    expect(instance).toBeDefined();
    expect(instance._getAriaLabel(firstChartPoints[2])).toEqual('35.');
  });
});

runTest('_computeLongestBarTotalValue', () => {
  beforeEach(sharedBeforeEach);

  test('Should return the length of the longest Bar value correctly', () => {
    const instance = new MultiStackedBarChartBase({
      data: data,
    });
    const computeLongestBarTotalValue = instance._computeLongestBarTotalValue();
    expect(instance).toBeDefined();
    expect(computeLongestBarTotalValue).toBeDefined();
    expect(computeLongestBarTotalValue).toEqual(223);
  });
});
