import * as React from 'react';
import { DonutChart, IChartDataPoint, IChartProps } from '../src/components/DonutChart/index';
import { render } from '@testing-library/react';
import { DonutChartBase } from '../src/components/DonutChart/DonutChart.base';
import { resetIds } from '@fluentui/react';

const env = require('../config/tests');

const runTest = env === 'TEST' ? describe : describe.skip;

const chartTitle = 'Donut chart example';
const pointsNoColors: IChartDataPoint[] = [
  { legend: 'first', data: 20000, xAxisCalloutData: '2020/04/30' },
  { legend: 'second', data: 39000, xAxisCalloutData: '2020/04/20' },
  { legend: 'third', data: 45000, xAxisCalloutData: '2020/04/25' },
];

const pointsWithColors: IChartDataPoint[] = [
  { legend: 'first', data: 20000, xAxisCalloutData: '2020/04/30', color: '#637cef' },
  { legend: 'second', data: 39000, xAxisCalloutData: '2020/04/20', color: '#637c00' },
  { legend: 'third', data: 45000, xAxisCalloutData: '2020/04/25', color: '#637c11' },
];

const emptyIchartDataPoints: IChartDataPoint[] = [];

export const emptyChartPoints: IChartProps = {
  chartTitle,
  chartData: [],
};

export const noColorsChartPoints: IChartProps = {
  chartTitle,
  chartData: pointsNoColors,
};

function sharedBeforeEach() {
  resetIds();
}

runTest('_createLegends', () => {
  beforeEach(sharedBeforeEach);

  test('Should return proper legends data', () => {
    render(<DonutChart data={noColorsChartPoints} />);
    const instance = new DonutChartBase({
      data: emptyChartPoints,
    });
    expect(instance).toBeDefined();
    const result = instance._createLegends(pointsNoColors);
    expect(result.props.legends).toHaveLength(3);
    expect(result.props.legends[0].title).toEqual('first');
    expect(result.props.legends[1].title).toEqual('second');
    expect(result.props.legends[2].title).toEqual('third');
  });

  test('Should not return legends when there is no data', () => {
    const instance = new DonutChartBase({
      data: emptyChartPoints,
    });
    expect(instance).toBeDefined();
    const result = instance._createLegends(emptyIchartDataPoints);
    expect(result.props.legends).toHaveLength(0);
  });
});

runTest('_addDefaultColors', () => {
  beforeEach(sharedBeforeEach);

  test('Should return default colors when color is not defined input data', () => {
    const instance = new DonutChartBase({
      data: emptyChartPoints,
    });
    expect(instance).toBeDefined();
    const result = instance._addDefaultColors(pointsNoColors);
    expect(result).toHaveLength(3);
    expect(result[0].color!).toEqual('#637cef');
    expect(result[1].color!).toEqual('#e3008c');
    expect(result[2].color!).toEqual('#2aa0a4');
  });

  test('Should return respective colors when color is defined input data', () => {
    const instance = new DonutChartBase({
      data: emptyChartPoints,
    });
    expect(instance).toBeDefined();
    const result = instance._addDefaultColors(pointsWithColors);
    expect(result).toHaveLength(3);
    expect(result[0].color!).toEqual('#637cef');
    expect(result[1].color!).toEqual('#637c00');
    expect(result[2].color!).toEqual('#637c11');
  });
});

runTest('_toLocaleString', () => {
  beforeEach(sharedBeforeEach);

  test('Should return proper string when input is a string', () => {
    const instance = new DonutChartBase({
      data: emptyChartPoints,
    });
    expect(instance).toBeDefined();
    const result = instance._toLocaleString('first');
    expect(result).toEqual('first');
  });

  test('Should return proper string when input is a number', () => {
    const instance = new DonutChartBase({
      data: emptyChartPoints,
    });
    expect(instance).toBeDefined();
    const result = instance._toLocaleString(10);
    expect(result).toEqual('10');
  });
});
