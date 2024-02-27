import { IGaugeChartProps } from '../src/components/GaugeChart/index';
import { GaugeChartBase } from '../src/components/GaugeChart/GaugeChart.base';
import { DataVizPalette } from '../src/utilities/colors';
import { DarkTheme } from '@fluentui/theme-samples';

const env = require('../config/tests');
const runTest = env === 'TEST' ? describe : describe.skip;

const segments = [
  { size: 33, color: DataVizPalette.success, legend: 'Low Risk' },
  { size: 34, color: DataVizPalette.warning, legend: 'Medium Risk' },
  { size: 33, color: DataVizPalette.error, legend: 'High Risk' },
];

const data: IGaugeChartProps = { segments: segments, chartValue: 100, theme: DarkTheme };
const emptyData: IGaugeChartProps = { segments: [], chartValue: 100, theme: DarkTheme };

runTest('_processProps', () => {
  test('Should return proper arcs data', () => {
    const instance = new GaugeChartBase(data);
    expect(instance).toBeDefined();
    const result = instance._processProps();
    expect(result.arcs).toHaveLength(3);
    expect(result.arcs[0].segmentIndex).toEqual(0);
    expect(result.arcs[1].segmentIndex).toEqual(1);
    expect(result.arcs[2].segmentIndex).toEqual(2);
    expect(result.arcs[0].d).toEqual('M0,0Z');
    expect(result.arcs[1].d).toEqual('M0,0Z');
    expect(result.arcs[2].d).toEqual('M0,0Z');
  });

  test('Should return zero arcs when there is no data', () => {
    const instance = new GaugeChartBase(emptyData);
    expect(instance).toBeDefined();
    const result = instance._processProps();
    expect(result.arcs).toHaveLength(0);
  });
});

runTest('_getMargins', () => {
  test('Should return zero arcs when there is no data', () => {
    const instance = new GaugeChartBase(data);
    expect(instance).toBeDefined();
    const result = instance._getMargins();
    expect(result.bottom).toEqual(16);
    expect(result.top).toEqual(18);
    expect(result.left).toEqual(56);
    expect(result.right).toEqual(56);
  });
});
