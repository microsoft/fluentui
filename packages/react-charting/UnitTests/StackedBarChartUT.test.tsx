import { StackedBarChartBase } from '../src/components/StackedBarChart/StackedBarChart.base';
import { IChartDataPoint, IChartProps } from '../src/components/StackedBarChart';
import { DefaultPalette } from '@fluentui/react';
import { DarkTheme } from '@fluentui/theme-samples';
import { resetIds } from '@fluentui/react';
const env = require('../config/tests');

const runTest = env === 'TEST' ? describe : describe.skip;

const points: IChartDataPoint[] = [
  {
    legend: 'first',
    data: 3000000,
    color: DefaultPalette.blue,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '99%',
  },
  { legend: 'second', data: 1, color: DefaultPalette.green },
];

const areaLabelPoints: IChartDataPoint[] = [
  {
    legend: 'first',
    data: 3000000,
    color: DefaultPalette.blue,
    xAxisCalloutData: '2020/04/30',
  },
  {
    legend: 'first',
    data: 3000000,
    color: DefaultPalette.blue,
    yAxisCalloutData: '50%',
  },
  {
    data: 2000,
    color: DefaultPalette.blue,
  },
];

const data: IChartProps = {
  chartTitle: 'Stacked Bar chart example',
  chartData: points,
};

function sharedBeforeEach() {
  resetIds();
}

runTest('_createBarsAndLegends', () => {
  beforeEach(sharedBeforeEach);

  test('Should return bars and legends which includes benchmark and target data', () => {
    const instance = new StackedBarChartBase({
      data: {},
    });
    expect(instance).toBeDefined();
    const { palette } = DarkTheme;
    const barHeight = 500;
    const benchmarkData = points[0];
    const targetData = points[0];

    const barsAndLegends = instance._createBarsAndLegends(data, barHeight, palette, benchmarkData, targetData);
    expect(barsAndLegends).toHaveLength(2);
    const bars = barsAndLegends[0];
    expect(bars).toHaveLength(2);
    const legendsDataObject = barsAndLegends[1];
    expect(legendsDataObject['props']).not.toBeNull();
    const legends = legendsDataObject['props']['legends'];
    expect(legends).toHaveLength(4);
  });

  test('Should return bars and legends which includes only benchmark data', () => {
    const instance = new StackedBarChartBase({
      data: {},
    });
    expect(instance).toBeDefined();
    const { palette } = DarkTheme;
    const barHeight = 500;
    const benchmarkData = points[0];

    const barsAndLegends = instance._createBarsAndLegends(data, barHeight, palette, benchmarkData);
    expect(barsAndLegends).toHaveLength(2);
    const bars = barsAndLegends[0];
    expect(bars).toHaveLength(2);
    const legendsDataObject = barsAndLegends[1];
    expect(legendsDataObject['props']).not.toBeNull();
    const legends = legendsDataObject['props']['legends'];
    expect(legends).toHaveLength(3);
  });

  test('Should return bars and legends data without benchmark and target data', () => {
    const instance = new StackedBarChartBase({
      data: {},
    });
    expect(instance).toBeDefined();
    const { palette } = DarkTheme;
    const barHeight = 500;

    const barsAndLegends = instance._createBarsAndLegends(data, barHeight, palette);
    expect(barsAndLegends).toHaveLength(2);
    const bars = barsAndLegends[0];
    expect(bars).toHaveLength(2);
    const legendsDataObject = barsAndLegends[1];
    expect(legendsDataObject['props']).not.toBeNull();
    const legends = legendsDataObject['props']['legends'];
    expect(legends).toHaveLength(2);
  });

  test('', () => {
    const instance = new StackedBarChartBase({
      data: {},
    });
    expect(instance).toBeDefined();
    const { palette } = DarkTheme;
    const barHeight = 500;
    const targetData = points[0];
    const benchMarkData: IChartDataPoint = {};
    const barsAndLegends = instance._createBarsAndLegends(data, barHeight, palette, benchMarkData, targetData);
    expect(barsAndLegends).toHaveLength(2);
    const bars = barsAndLegends[0];
    expect(bars).toHaveLength(2);
    const legendsDataObject = barsAndLegends[1];
    expect(legendsDataObject['props']).not.toBeNull();
    const legends = legendsDataObject['props']['legends'];
    expect(legends).toHaveLength(4);
  });
});

runTest('_isChartEmpty', () => {
  beforeEach(sharedBeforeEach);

  test('Should return true when chart data is empty ', () => {
    const emptyData: IChartProps = {};
    const instance = new StackedBarChartBase({
      data: emptyData,
    });
    expect(instance).toBeDefined();
    expect(instance._isChartEmpty()).toEqual(true);
  });

  test('Should return false when chart data is available ', () => {
    const instance = new StackedBarChartBase({
      data: data,
    });
    expect(instance).toBeDefined();
    expect(instance._isChartEmpty()).toEqual(false);
  });
});

runTest('_getAriaLabel', () => {
  beforeEach(sharedBeforeEach);

  test('Should return correct aria label for a point with xAxisCalloutData and yAxisCalloutData', () => {
    const emptyData: IChartProps = {};
    const instance = new StackedBarChartBase({
      data: emptyData,
    });
    expect(instance).toBeDefined();
    expect(instance._getAriaLabel(points[0])).toEqual('2020/04/30, 99%.');
  });

  test('Should return correct aria label for a point without xAxisCalloutData and yAxisCalloutData', () => {
    const emptyData: IChartProps = {};
    const instance = new StackedBarChartBase({
      data: emptyData,
    });
    expect(instance).toBeDefined();
    expect(instance._getAriaLabel(points[1])).toEqual('second, 1.');
  });

  test('Should return correct aria label for a point with xAxisCalloutData and without yAxisCalloutData', () => {
    const emptyData: IChartProps = {};
    const instance = new StackedBarChartBase({
      data: emptyData,
    });
    expect(instance).toBeDefined();
    expect(instance._getAriaLabel(areaLabelPoints[0])).toEqual('2020/04/30, 3000000.');
  });

  test('Should return correct aria label for a point without xAxisCalloutData and with yAxisCalloutData', () => {
    const emptyData: IChartProps = {};
    const instance = new StackedBarChartBase({
      data: emptyData,
    });
    expect(instance).toBeDefined();
    expect(instance._getAriaLabel(areaLabelPoints[1])).toEqual('first, 50%.');
  });

  test('Should return correct aria label for a point without legend,xAxisCalloutData yAxisCalloutData', () => {
    const emptyData: IChartProps = {};
    const instance = new StackedBarChartBase({
      data: emptyData,
    });
    expect(instance).toBeDefined();
    expect(instance._getAriaLabel(areaLabelPoints[2])).toEqual('2000.');
  });
});
