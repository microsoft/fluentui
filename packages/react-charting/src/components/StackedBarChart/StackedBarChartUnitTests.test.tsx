import { StackedBarChartBase } from './StackedBarChart.base';
import { IChartDataPoint, IChartProps } from '../../StackedBarChart';
import { DefaultPalette } from '@fluentui/react';
import { DarkTheme } from '@fluentui/theme-samples';

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

const data: IChartProps = {
  chartTitle: 'Stacked Bar chart example',
  chartData: points,
};

describe('_createBarsAndLegends', () => {
  test('Should return bars, legends, benchmark with target data', () => {
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

  test('Should return bars, legends, benchmark data without target data', () => {
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

  test('Should return bars, legends data without benchmark and  target data', () => {
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

  test('Should return bars, legends, target data without benchmark data', () => {
    const instance = new StackedBarChartBase({
      data: {},
    });
    expect(instance).toBeDefined();
    const { palette } = DarkTheme;
    const barHeight = 500;
    const targetData = points[0];

    const barsAndLegends = instance._createBarsAndLegends(data, barHeight, palette, targetData);
    expect(barsAndLegends).toHaveLength(2);
    const bars = barsAndLegends[0];
    expect(bars).toHaveLength(2);
    const legendsDataObject = barsAndLegends[1];
    expect(legendsDataObject['props']).not.toBeNull();
    const legends = legendsDataObject['props']['legends'];
    expect(legends).toHaveLength(3);
  });

  test('Should return bars, legends, target data without benchmark data', () => {
    const emptyData: IChartProps = {};
    const instance = new StackedBarChartBase({
      data: emptyData,
    });
    expect(instance).toBeDefined();
    const { palette } = DarkTheme;
    const barHeight = 500;
    const targetData = points[0];
    const barsAndLegends = instance._createBarsAndLegends(data, barHeight, palette, targetData);
    expect(barsAndLegends).toHaveLength(2);
    const bars = barsAndLegends[0];
    expect(bars).toHaveLength(2);
    const legendsDataObject = barsAndLegends[1];
    expect(legendsDataObject['props']).not.toBeNull();
    const legends = legendsDataObject['props']['legends'];
    expect(legends).toHaveLength(3);
  });
});

describe('_isChartEmpty', () => {
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

describe('_getAriaLabel', () => {
  test('Should return correct aria label for a point when we have xAxisCalloutData and yAxisCalloutData', () => {
    const emptyData: IChartProps = {};
    const instance = new StackedBarChartBase({
      data: emptyData,
    });
    expect(instance).toBeDefined();
    expect(instance._getAriaLabel(points[0])).toEqual('2020/04/30, 99%.');
  });

  test('Should return correct aria label for a point when we do not have xAxisCalloutData and yAxisCalloutData', () => {
    const emptyData: IChartProps = {};
    const instance = new StackedBarChartBase({
      data: emptyData,
    });
    expect(instance).toBeDefined();
    expect(instance._getAriaLabel(points[1])).toEqual('second, 1.');
  });
});
